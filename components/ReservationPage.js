import { useContext, useEffect, useState } from "react";
import ImageCarousel from "./UI/ImageCarousel";
import * as Dialog from "@radix-ui/react-dialog";
import { GrFormClose } from "react-icons/gr";
import { motion } from "framer-motion";
import {
  createReservation,
  createRewardPointsReservation,
} from "../db_func/reservations";
import { LoginContext } from "../context";
import Link from "next/link";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HotelRoom } from "../types/types";
import { createProduct } from "../stripe/stripe_product";
import { useRouter } from "next/router";
import BackButton from "./UI/BackButton";
import LoginButton from "./UI/LoginButton";
import PuffLoader from "react-spinners/PuffLoader";

const ReservationPage = ({ hotel }) => {
  const { user } = useContext(LoginContext);

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

  for (let i = 0; i < excludedDates.length; i++) {
    console.log(excludedDates[i]);
  }

  // const minStartDate = () => {
  //   var minD = new Date();
  //   var i = 0;
  //   while (i < excludedDates.length) {
  //     if (minD > excludedDates[i]) {
  //       i ++;
  //     } else if (minD == excludedDates[i]) {
  //       minD.setDate(minD.getDate() + 1);
  //     } else {

  //       console.log("Test: " + excludedDates[i]);

  //       minD = excludedDates[i];
  //       console.log("Test min: " + minD);
  //       break;
  //     }
  //   }
  //   return minD;
  // };

  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  var minCheckout = new Date(startDate);
  minCheckout.setDate(minCheckout.getDate() + 1);
  const [endDate, setEndDate] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [rewardsLoader, setRewardsLoader] = useState(false);
  const [points, setPoints] = useState(0);

  const router = useRouter();

  const reservationHandler = async ({ hotel, user, startDate, endDate }) => {
    setLoader(true);
    const data = await createProduct(
      hotel,
      startDate,
      endDate,
      Math.floor(total * 100)
    );
    // console.log(total + ', ' + total * 100);
    if (data) {
      const data2 = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({
          priceId: data.data.price.id,
          userId: user.id,
          hotelId: hotel.id,
          startDate: startDate,
          endDate: endDate,
          price: Math.floor(total * 100),
        }),
      });
      const stripeData = await data2.json();
      setLoader(false);
      router.push(stripeData.url);
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const rewardsReservationHandler = async () => {
    createRewardPointsReservation(hotel, user, startDate, endDate, total);
    setRewardsLoader(true);
    // await delay(3000);
    // router.push("/profile");
  };

  const nextPage = async () => {
    router.push("/profile");
  }

  const totalHandler = () => {
    if (startDate && endDate && endDate > startDate) {
      setError(false);
      const total = (endDate - startDate) / 8640000000;
      if (total >= 0) {
        setTotal((total * hotel?.price).toFixed(2));
      }
    } else {
      setError(true);
      setTotal(0);
    }
  };

  useEffect(() => {
    totalHandler();
  }, [startDate, endDate]);

  useEffect(() => {
    if (Math.ceil(total * 40) >= 0) {
      setPoints(Math.ceil(total * 40));
    }
  }, [total]);

  useEffect(() => {
    if (user.rewardPoints >= points && points > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [points]);

  // const excludedDates = [];
  // for (let i = 0; i < hotel?.reservations.length; i++) {
  //   const dateToAdd = new Date(hotel.reservations[i].startDate);
  //   while (dateToAdd <= hotel.reservations[i].endDate) {
  //     excludedDates.push(new Date(dateToAdd));
  //     dateToAdd.setDate(dateToAdd.getDate() + 1);
  //   }
  // }

  // for (let i = 0; i < user?.currentBooking.length; i++) {
  //   const dateToAdd = new Date(user.currentBooking[i].startDate);
  //   while (dateToAdd <= user.currentBooking[i].endDate) {
  //     excludedDates.push(new Date(dateToAdd));
  //     dateToAdd.setDate(dateToAdd.getDate() + 1);
  //   }
  // }

  // excludedDates.sort(function (a, b) {
  //   const d1 = new Date(a);
  //   const d2 = new Date(b);
  //   return d1 - d2;
  // });

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

  const container = {
    hidden: { y: "-10%", x: "-50%" },
    visible: {
      y: "-50%",
      x: "-50%",
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center flex-col p-36  bg-gradient-to-b from-white to-tertiary/40">
      <div className="text-black text-center mb-12 ">
        <h1 className="text-5xl font-bold">{hotel?.hotel}</h1>
      </div>
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <BackButton href="/hotels" />
        <LoginButton color="black" />
      </div>

      <div className="h-full w-full grid grid-cols-2 gap-8">
        <div className="ring-1 drop-shadow-lg ring-black/20 rounded-lg shadow-lg h-full w-full">
          <ImageCarousel images={hotel?.image} />
        </div>
        <div className="ring-1 drop-shadow-lg ring-black/20 bg-white/50 backdrop-blur-xl shadow-lg rounded-lg w-full px-20 flex items-center justify-center flex-col">
          <div className=" flex flex-row justify-between my-4 w-full">
            <h3 className="text-xl font-bold">Rate</h3>
            <h3 className="text-xl font-bold">
              ${hotel?.price / 100}{" "}
              <span className="font-medium">per night</span>
            </h3>
          </div>
          {error && (
            <div className="w-full items-center justify-center flex mb-2 bg-red-500 p-2 rounded-md text-white">
              Invalid dates please try different dates.
            </div>
          )}
          <form className="flex flex-col w-full">
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
              {/* <input
                type="date"
                name="checkin-date"
                value={checkin}
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckin(e.target.value)}
              /> */}
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
              {/* <input
                type="date"
                name="checkout-date"
                value={checkout}
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckout(e.target.value)}
              /> */}
            </div>
            <div className="w-full h-[2px] bg-black/20 my-4 " />
            <div className="mb-4 w-full text-xl font-bold flex justify-between items-center">
              <h4>Total </h4>
              <h4>${total} </h4>
            </div>

            <div
              className={`${
                error
                  ? "cursor-not-allowed hover:none text-white/50"
                  : "bg-gradient-to-r from-tertiary to-[#79A1F7] hover:scale-[1.01] hover:shadow-xl"
              } relative w-full shadow-lg  cursor-pointer  font-bold text-white   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary`}
              onClick={() =>
                reservationHandler({ hotel, user, startDate, endDate })
              }
            >
              <p>Reserve</p>
              {loader && (
                <div className="absolute right-4">
                  <PuffLoader
                    color={"#ffffff"}
                    loading={loader}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>
            <Dialog.Root>
              <Dialog.Trigger>
                <div
                  className={`${
                    disabled
                      ? "cursor-not-allowed bg-black text-white/50"
                      : "bg-gradient-to-r from-gray-800 to-gray-500 hover:scale-[1.01] hover:shadow-xl text-white "
                  } w-full  mt-4 select-none shadow-lg relative text-sm cursor-pointer  font-bold   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary`}
                  onClick={() =>
                    rewardsReservationHandler(
                      hotel,
                      user,
                      startDate,
                      endDate,
                      total
                    )
                  }
                >
                  <p>Reserve with Rewards Points</p>
                  {rewardsLoader && (
                    <div className="absolute right-4">
                      <PuffLoader
                        color={"#ffffff"}
                        loading={rewardsLoader}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  )}
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
                      Congrats! Your booking is successful.
                    </p>
                    <Dialog.Close className="absolute top-6 left-6">
                      <GrFormClose className="text-xl" />
                    </Dialog.Close>
                    <Dialog.Close>
                      <div
                      className="mt-8 px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-green-500 to-green-400 select-none text-white  space-x-2"
                      onClick={() => 
                          nextPage()
                        }   
                      >
                        Click here to continue
                      </div>
                      
                      
                    </Dialog.Close>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            {/* <div
              className={`${
                disabled
                  ? "cursor-not-allowed bg-black text-white/50"
                  : "bg-gradient-to-r from-gray-800 to-gray-500 hover:scale-[1.01] hover:shadow-xl text-white "
              } w-full  mt-4 select-none shadow-lg relative text-sm cursor-pointer  font-bold   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary`}
              onClick={() =>
                rewardsReservationHandler(
                  hotel,
                  user,
                  startDate,
                  endDate,
                  total
                )
              }
            >
              <p>Reserve with Rewards Points</p>
              {rewardsLoader && (
                <div className="absolute right-4">
                  <PuffLoader
                    color={"#ffffff"}
                    loading={rewardsLoader}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div> */}
            <div className="mt-4 w-full text-sm font-bold flex justify-center items-center">
              <h4>{points} points</h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
