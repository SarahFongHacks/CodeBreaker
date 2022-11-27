import React, { useContext, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import {
  cancelReservation,
  changeReservationDate,
} from "../../db_func/reservations";
import { getHotelRoom } from "../../db_func/hotelRoom";
import { HotelRoom } from "../../types/types";
import { useRouter } from "next/router";
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

const RewardsDialog = ({ booking }) => {
  var today = new Date();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(today);
  var minCheckout = new Date(startDate);
  minCheckout.setDate(minCheckout.getDate() + 1);
  const [endDate, setEndDate] = useState(minCheckout);
  const [hotel, setHotel] = useState(null);
  const [enableRewards, setEnableRewards] = useState(0);
  const [canceled, setCanceled] = useState(false);

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
  }, [canceled]);

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

  const excludedDates = [];
  for (let i = 0; i < hotel?.reservations.length; i++) {
    excludedDates.push({
      start: new Date(hotel.reservations[i].startDate),
      end: new Date(hotel.reservations[i].endDate),
    });
  }

  const disableDateRange = excludedDates.map((range) => ({
    start: range.start,
    end: range.end,
  }));

  const cancelRewardsHandler = () => {
    cancelReservation(booking);
    setCanceled(true);
  };

  return (
    <div
      className={`${
        canceled && "hidden"
      } bg-white  w-full grid relative transition duration-200 ease-linear grid-cols-5 gap-8 p-8 justify-between rounded-lg h-64 shadow-lg ring-1 ring-black/20`}
    >
      <div className="col-span-2 h-full w-full square overflow-hidden rounded-md object-cover">
        <img src={hotel?.image[0]} className="object-cover w-full h-full " />
      </div>

      <div className="absolute top-4 right-4  flex items-center justify-center bg-green-500 text-white p-2 rounded-full">
        <IoTicketSharp />
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
            <div className="w-full grid grid-cols-1">
              <div
                className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-red-500 text-white p-2 rounded-lg font-bold"
                onClick={() => cancelRewardsHandler()}
              >
                <p>Cancel booking</p>
              </div>
            </div>
          ) : enableRewards == 1 ? (
            <div className="w-full grid grid-cols-1">
              <div className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-green-500 text-white p-2 rounded-lg font-bold">
                <p>Booking has ended</p>
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
  );
};

export default RewardsDialog;
