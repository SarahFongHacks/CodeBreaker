import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import {
  cancelReservation,
  changeReservationDate,
} from "../../db_func/reservations";
import { getHotelRoom } from "../../db_func/hotelRoom";
import { HotelRoom } from "../../types/types";
import { Router, useRouter } from "next/router";
import { LoginContext } from "../../context";
import { createProduct } from "../../stripe/stripe_product";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdHotel } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { BsCalendarWeekFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { getUser, updateRewardPoints } from "../../db_func/user";
import { IoTicketSharp } from "react-icons/io5";
import RewardsDialog from "./RewardsDialog";

const DateDialog = ({ booking }) => {
  var today = new Date();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  var minCheckout = new Date(startDate);
  minCheckout.setDate(minCheckout.getDate() + 1);
  const [endDate, setEndDate] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [enableRewards, setEnableRewards] = useState(0);
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    if (booking.startDate > today) {
      setEnableRewards(0);
    } else if (booking.endDate < today) {
      setEnableRewards(1);
    } else {
      setEnableRewards(2);
    }
  }, []);

  const totalHandler = () => {
    if (startDate && endDate && endDate > startDate) {
      setError(false);
      const total = (endDate - startDate) / 8640000000;
      const newTotal = (total * hotel?.price).toFixed(2);
      if (!isNaN(newTotal)) {
        setTotal(newTotal);
      }
    } else {
      setError(true);
      setTotal(0);
    }
  };

  useEffect(() => {
    totalHandler();
  }, [startDate, endDate]);

  const router = useRouter();
  const { user, setUser, loading } = useContext(LoginContext);

  const getUserUpdated = async () => {
    if (user) {
      const updated = await getUser(user.id);
      setUser(updated);
    }
  };

  useEffect(() => {
    getUserUpdated();
  }, [redeemed]);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const container = {
    hidden: { y: "-10%", x: "-50%" },
    visible: {
      y: "-50%",
      x: "-50%",
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  const getHotel = async () => {
    const hotel = await getHotelRoom(booking.hotelRoomId);
    setHotel(hotel);
  };

  const cancelHandler = async () => {
    // if(booking.paymentIntent === "RewardPoints"){
    //   console.log("Cancel reward booking");
    //   cancelReservation(booking);
    // } else {
    //   const data = await fetch("/api/cancel_sessions", {
    //     method: "POST",
    //     body: JSON.stringify(booking),
    //   });
    //   const stripeData = await data.json();
    //   // console.log(stripeData);
    //   router.push(stripeData.url);
    // }
    const data = await fetch("/api/cancel_sessions", {
      method: "POST",
      body: JSON.stringify(booking),
    });
    const stripeData = await data.json();
    // console.log(stripeData);
    router.push(stripeData.url);
  };

  const editHandler = async ({ hotel, user, startDate, endDate, total }) => {
    const data = await createProduct(hotel, startDate, endDate, total * 100);
    if (data) {
      const data2 = await fetch("/api/edit_sessions", {
        method: "POST",
        body: JSON.stringify({
          priceId: data.data.price.id,
          prevBooking: booking,
          endDate: endDate,
          startDate: startDate,
        }),
      });
      const stripeData = await data2.json();
      // console.log(stripeData);
      router.push(stripeData.url);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  // const excludedDates = [];
  // for (let i = 0; i < hotel?.reservations.length; i++) {
  //   excludedDates.push({
  //     start: new Date(hotel.reservations[i].startDate),
  //     end: new Date(hotel.reservations[i].endDate),
  //   });
  // }

  // const disableDateRange = excludedDates.map((range) => ({
  //   start: range.start,
  //   end: range.end,
  // }));

  const excludedDates = [];
  for (let i = 0; i < hotel?.reservations.length; i++) {
    const dateToAdd = new Date(hotel.reservations[i].startDate);
    while (dateToAdd <= hotel.reservations[i].endDate) {
      excludedDates.push(new Date(dateToAdd));
      dateToAdd.setDate(dateToAdd.getDate() + 1);
    }
  }

  for (let i = 0; i < user?.currentBooking.length; i++) {
    const dateToAdd = new Date(user.currentBooking[i].startDate);
    while (dateToAdd <= user.currentBooking[i].endDate) {
      excludedDates.push(new Date(dateToAdd));
      dateToAdd.setDate(dateToAdd.getDate() + 1);
    }
  }

  excludedDates.sort(function (a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return d1 - d2;
  });

  const maxCheckout = () => {
    var maxC = null;
    for (let i = 0; i < excludedDates.length; i++) {
      if (minCheckout < excludedDates[i]) {
        const maxDate = new Date(excludedDates[i]);
        maxDate.setDate(maxDate.getDate() - 1);
        maxC = new Date(maxDate);
        break;
      }
    }
    return maxC;
  };


  const rewardsHandler = () => {
    updateRewardPoints(user, booking.rewardPoints);
    cancelReservation(booking);
    setRedeemed(true);
  };

  const cancelRewardsHandler = () => {
    cancelReservation(booking);
  };

  return (
    <div>
      {booking.paymentIntent == "RewardPoints" ? (
        <RewardsDialog booking={booking} />
      ) : (
        <div
          className={`${
            redeemed && "hidden"
          } bg-white  w-full grid relative transition duration-200 ease-linear grid-cols-5 gap-8 p-8 justify-between rounded-lg h-64 shadow-lg ring-1 ring-black/20`}
        >
          <div className="col-span-2 h-full w-full square overflow-hidden rounded-md object-cover">
            <img
              src={hotel?.image[0]}
              className="object-cover w-full h-full "
            />
          </div>

          <div className="col-span-3 flex flex-col h-full justify-between pt-4">
            <div className="grid grid-cols-3 w-full gap-4">
              <div className="w-full flex flex-row justify-center items-center ">
                <div className="flex flex-col w-full items-center justify-between mb-1">
                  <h1 className="">Hotel</h1>
                  <h1 className="font-bold">{hotel?.hotel}</h1>
                </div>
                <MdHotel className="" />
              </div>
              <div className="w-full flex flex-row justify-center items-center ">
                <div className="flex flex-col w-full items-center justify-between mb-1">
                  <h1 className="">Location</h1>
                  <h1 className="font-bold">{hotel?.location}</h1>
                </div>
                <HiLocationMarker className="" />
              </div>
              <div className="w-full flex flex-row justify-center items-center ">
                <div className="flex flex-col w-full items-center justify-between mb-1">
                  <h1 className=" ">Room </h1>
                  <h1 className="font-bold ">{hotel?.roomNumber}</h1>
                </div>
                <MdMeetingRoom className="" />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-row relative space-x-2 mt-4 items-center justify-center text-white bg-black ring-black ring-1 p-2 rounded-sm font-bold">
                <BsCalendarWeekFill className="absolute right-4" />
                <p>{booking?.startDate && dateHandler(booking?.startDate)}</p>
                <p>-</p>
                <p>{booking?.endDate && dateHandler(booking?.endDate)}</p>
              </div>
              {enableRewards == 0 ? (
                <div className="w-full grid grid-cols-2 gap-2">
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <div className="w-full hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear flex flex-row space-x-2 mt-4 items-center justify-center bg-tertiary text-white p-2 rounded-lg font-bold">
                        <p>Edit booking</p>
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Portal className="flex h-screen w-full items-center justify-center">
                      <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                      <Dialog.Content>
                        <motion.div
                          className="flex flex-col p-16 items-center justify-center overflow-y-scroll fixed left-1/2 top-1/2 w-8/12 max-w-[54rem] bg-white rounded-lg"
                          initial="hidden"
                          animate="visible"
                          variants={container}
                        >
                          <p className="font-bold text-xl mb-8">
                            Edit your reservation
                          </p>

                          <form className="flex flex-col w-80">
                            {error && (
                              <div className="w-full items-center justify-center flex mb-2 bg-red-500 p-2 rounded-md text-white">
                                Invalid dates: Please try different dates.
                              </div>
                            )}
                            <div className="check-in">
                              <label>Check in: </label>
                              <DatePicker
                                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  setEndDate(date);
                                }}
                                excludeDates={excludedDates}
                                //excludeDateIntervals={disableDateRange}
                                minDate={new Date()}
                              />
                            </div>
                            <div className="check-out">
                              <label>Check out: </label>
                              <DatePicker
                                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                                selected={endDate}
                                excludeDates={excludedDates}
                               //excludeDateIntervals={disableDateRange}
                                onChange={(date) => setEndDate(date)}
                                minDate={minCheckout}
                                maxDate={maxCheckout()}
                              />
                            </div>
                            <div className="w-full h-[2px] bg-black/20 my-4 mt-16 " />
                            <div className="mb-4 w-full text-xl font-bold flex justify-between items-center">
                              <h4>Total </h4>
                              <h4>${total} </h4>
                            </div>
                          </form>
                          <Dialog.Close className="absolute top-6 left-6">
                            <GrFormClose className="text-xl" />
                          </Dialog.Close>
                          <Dialog.Close>
                            <div
                              onClick={() =>
                                editHandler({
                                  hotel,
                                  user,
                                  startDate,
                                  endDate,
                                  total,
                                })
                              }
                              className="mt-8 px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white  space-x-2"
                            >
                              Edit reservation
                            </div>
                          </Dialog.Close>
                        </motion.div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <div className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-red-500 text-white p-2 rounded-lg font-bold">
                        <p>Cancel booking</p>
                      </div>
                    </Dialog.Trigger>
                    <Dialog.Portal className="flex h-screen w-full items-center justify-center">
                      <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                      <Dialog.Content>
                        <motion.div
                          className="flex flex-col p-16 items-center justify-center overflow-y-scroll fixed left-1/2 top-1/2 w-8/12 max-w-[54rem] bg-white rounded-lg"
                          initial="hidden"
                          animate="visible"
                          variants={container}
                        >
                          <p className="font-bold text-xl mb-8">
                            Are you sure you want to cancel your reservation?
                          </p>
                          <p>
                            Confirming this action will cancel your reservation
                            and refund your initial payment. You will be charged
                            a fee of $10.00 for this cancellation. Please note
                            that this action cannot be undone.
                          </p>
                          <Dialog.Close className="absolute top-6 left-6">
                            <GrFormClose className="text-xl" />
                          </Dialog.Close>
                          <Dialog.Close>
                            <div
                              onClick={() => cancelHandler()}
                              className="mt-8 px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-red-500 to-red-400 select-none text-white  space-x-2"
                            >
                              Cancel booking
                            </div>
                          </Dialog.Close>
                        </motion.div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              ) : enableRewards == 1 ? (
                <div className="w-full grid grid-cols-1">
                  <div
                    className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-green-500 text-white p-2 rounded-lg font-bold"
                    onClick={() => rewardsHandler()}
                  >
                    <p>Redeem rewards points</p>
                  </div>
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 ">
                  <div className="w-full flex flex-row relative space-x-2 mt-4 items-center justify-center text-white bg-black/60 p-2 rounded-sm font-bold">
                    Booking is in progress
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateDialog;
