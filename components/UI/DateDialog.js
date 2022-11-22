import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { changeReservationDate } from "../../db_func/reservations";
import { getHotelRoom } from "../../db_func/hotelRoom";
import { HotelRoom } from "../../types/types";
import { useRouter } from "next/router";
import { LoginContext } from "../../context";
import { createProduct } from "../../stripe/stripe_product";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateDialog = ({ booking, changed, setChanged }) => {
  var today = new Date();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(today);
  var minCheckout = new Date(startDate);
  minCheckout.setDate(minCheckout.getDate() + 1);
  const [endDate, setEndDate] = useState(minCheckout);
  const [hotel, setHotel] = useState(null);

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

  const excludedDates = [];
  for (let i = 0; i < hotel?.reservations.length; i++) {
    excludedDates.push({
      start: new Date(hotel.reservations[i].startDate),
      end: new Date(hotel.reservations[i].endDate),
    });
    //console.log(new Date(hotel.reservations[i].startDate) + ", " + new Date(hotel.reservations[i].endDate));
  }

  const disableDateRange = excludedDates.map((range) => ({
    start: range.start,
    end: range.end,
  }));

  const router = useRouter();
  const { user } = useContext(LoginContext);

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
      const data2 = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({
          priceId: data.data.price.id,
          userId: user.id,
          hotelId: hotel.id,
          startDate: startDate,
          endDate: endDate,
        }),
      });
      const stripeData = await data2.json();
      console.log(stripeData);
      router.push(stripeData.url);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div className=" bg-white/70 backdrop-blur-xl  w-full grid grid-cols-3 gap-8 p-8 justify-between rounded-lg h-64 shadow-lg ring-1 ring-black/20">
      <div className="h-full w-full square overflow-hidden rounded-lg object-cover">
        <img src={hotel?.image[0]} className="object-cover w-full h-full " />
      </div>
      <div className="col-span-2 flex flex-col ">
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Hotel name</h1>
          <h1 className="font-bold text-lg">{hotel?.hotel}</h1>
        </div>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Location</h1>
          <h1 className="font-bold text-lg">{hotel?.location}</h1>
        </div>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Room number</h1>
          <h1 className="font-bold text-lg">{hotel?.roomNumber}</h1>
        </div>

        <div className="w-full flex flex-row space-x-2 mt-4 items-center justify-center text-tertiary ring-tertiary ring-1 p-2 rounded-lg font-bold">
          <p>{booking?.startDate && dateHandler(booking?.startDate)}</p>
          <p>-</p>
          <p>{booking?.endDate && dateHandler(booking?.endDate)}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <Dialog.Root>
            <Dialog.Trigger>
              <div className="w-full hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear flex flex-row space-x-2 mt-4 items-center justify-center bg-black text-white p-2 rounded-lg font-bold">
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
                        Invalid dates please try different dates.
                      </div>
                    )}
                    <div className="check-in">
                      <label>Check in: </label>
                      <DatePicker
                        className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        //excludeDates={excludedDates}
                        excludeDateIntervals={disableDateRange}
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
                        excludeDateIntervals={disableDateRange}
                        onChange={(date) => setEndDate(date)}
                        minDate={minCheckout}
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
                  </form>
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
          <div
            className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-red-500 text-white p-2 rounded-lg font-bold"
            onClick={() => cancelHandler()}
          >
            <p>Cancel booking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDialog;
