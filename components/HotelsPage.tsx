import Link from "next/link";
import React, { useContext } from "react";
import { signout } from "../auth/auth";
import { LoginContext } from "../context";
import useHotels from "../hooks/useHotels";
import { auth } from "../pages";
import HotelSelect from "./HotelSelect";
import { motion } from "framer-motion";
import LoginButton from "./LoginButton";

const Hotels = () => {
  const { data: hotels } = useHotels();
  const { user, setUser } = useContext(LoginContext);

  const signOutHandler = (auth) => {
    signout(auth);
    setUser(undefined);
  };

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col items-center justify-start p-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute top-0 flex w-full items-center justify-end p-8">
        <LoginButton color="black" />
      </div>
      <h1 className="font-bold text-4xl mb-8">Hotels</h1>
      {/* <div className="w-full items-center justify-start flex mb-8">
        <input className="w-full rounded-md p-3 h-12 border-[2px] border-secondary mr-4 focus:outline-none" />
        <div className="w-44 h-12 bg-secondary p-3 rounded-md flex items-center justify-center cursor-pointer">
          <p className="">Filter</p>
        </div>
      </div> */}
      <div className="w-full h-full grid grid-cols-3 gap-8 items-start justify-center">
        {hotels.map((hotel) => {
          return <HotelSelect hotel={hotel} />;
        })}
      </div>
    </motion.div>
  );
};

export default Hotels;
