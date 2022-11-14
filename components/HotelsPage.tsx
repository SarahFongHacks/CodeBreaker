import Link from "next/link";
import React, { useContext } from "react";
import { signout } from "../auth/auth";
import { LoginContext } from "../context";
import useHotels from "../hooks/useHotels";
import { auth } from "../pages";
import HotelSelect from "./UI/HotelSelect";
import { motion } from "framer-motion";
import LoginButton from "./UI/LoginButton";
import Filter from "./UI/Filter";

import useStore from "../lib/store";

const Hotels = () => {
  const { data: hotels } = useHotels();
  const { user, setUser } = useContext(LoginContext);

  const search = useStore((state) => state.search);

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
      <Filter />
      <div className="w-full h-full grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-start justify-center mt-8">
        {search.length > 0
          ? search.map((hotel) => {
              return <HotelSelect hotel={hotel} key={hotel.id} />;
            })
          : hotels.map((hotel) => {
              return <HotelSelect hotel={hotel} key={hotel.id} />;
            })}
      </div>
    </motion.div>
  );
};

export default Hotels;
