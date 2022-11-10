import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdLocationPin, MdPeopleAlt } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaMoneyBillWave, FaToilet } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { LoginContext } from "../context";
import { createReservation } from "../db_func/reservations";
import Link from "next/link";
import { auth } from "../pages";
import { signout } from "../auth/auth";
import { motion } from "framer-motion";

// import "react-dates/initialize";
// import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
import ImageCarousel from "./UI/ImageCarousel";
import LoginButton from "./UI/LoginButton";

const Hotel = ({ hotels }) => {
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [registered, setRegistered] = useState(false);
  const [focusedInput, setFocusedInput] = useState();

  const router = useRouter();
  const id = router.asPath.slice(7);
  const hotel = hotels.find((hotel) => hotel.id === id);

  const { user, setUser } = useContext(LoginContext);

  const registrationHandler = ({ hotel, user, checkin, checkout }) => {
    createReservation(hotel, user, new Date(checkin), new Date(checkout)).then(
      (res) => {
        // res.error === false && setRegistered(true);
        res.error === false && alert("Hotel was successfully booked!");
      }
    );
  };

  const signOutHandler = (auth) => {
    signout(auth);
    setUser(undefined);
  };

  const container = {
    hidden: { y: 0 },
    visible: { y: 0, transition: { duration: 0.5, staggerChildren: 0.5 } },
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="w-full h-screen flex flex-col items-center justify-center p-36 relative overflow-hidden"
      key="main"
      initial="hidden"
      animate="visible"
      variants={container}
      exit={{ opacity: 0 }}
    >
      <div className="absolute left-0 top-0 flex w-full items-center justify-end p-8">
        <LoginButton color="black" />
      </div>
      <div className="overflow-hidden ">
        <motion.h1
          variants={item}
          className="font-bold text-4xl mb-8 self-start"
        >
          {hotel?.hotel}
        </motion.h1>
      </div>
      <motion.div
        variants={item}
        className="flex flex-row items-start justify-center space-x-8"
      >
        <ImageCarousel images={hotel?.image} />
        <div className="w-1/2 h-full flex flex-col justify-between items-start">
          <div className="w-full grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Location</p>
                <p className="text-base">{hotel?.location}</p>
              </div>
              <MdLocationPin className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Capacity</p>
                <p className="text-base">{hotel?.capacity} Guests</p>
              </div>
              <MdPeopleAlt className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Bedrooms</p>
                <p className="text-base">{hotel?.numberOfBeds} Beds</p>
              </div>
              <IoIosBed className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Bathrooms</p>
                <p className="text-base">{hotel?.numberOfBathrooms} Baths</p>
              </div>
              <FaToilet className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Room Number</p>
                <p className="text-base">{hotel?.roomNumber}</p>
              </div>
              <BsFillDoorOpenFill className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Rate</p>
                <p className="text-base">${hotel?.price / 100}/night</p>
              </div>
              <FaMoneyBillWave className="mx-1" />
            </div>
          </div>
          <div className=" flex flex-row justify-center items-center ">
            {/* <DateRangePicker
              daySize={30}
              openDirection={"up"}
              startDate={checkin}
              startDateId="start-date"
              endDate={checkout}
              endDateId="end-date"
              onDatesChange={({ startDate, endDate }) => {
                setCheckin(startDate);
                setCheckout(endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            /> */}
            {/* <div className="flex flex-col">
              <label htmlFor="startDate" className="font-semibold">
                Check-in
              </label>
              <input
                type="date"
                id="startDate"
                className="focus:outline-none ring-1 ring-black/20 p-2 rounded-md"
                onChange={(e) => setCheckin(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="font-semibold">
                Checkout
              </label>
              <input
                type="date"
                id="endDate"
                className="focus:outline-none ring-1 ring-black/20 p-2 rounded-md"
                onChange={(e) => setCheckout(e.target.value)}
              ></input>
            </div> */}
          </div>
          {user ? (
            <Link href="/reservation">
            <div
              className="w-full shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-tertiary to-[#79A1F7] font-bold text-white   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary"
              // onClick={() =>
              //   registrationHandler({ hotel, user, checkin, checkout })
              // }
            >
              Book Now
            </div>
          </Link>
          ) : (
            <Link href="/login">
              <div className="w-full shadow-lg hover:shadow-xl hover:scale-[1.01] cursor-pointer font-bold ring-red-500 bg-gradient-to-r to-[#F37979] text-white   py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center from-red-500">
                Login to book
              </div>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hotel;
