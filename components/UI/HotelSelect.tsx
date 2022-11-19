import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const HotelSelect = ({ hotel }) => {
  const variants = {
    hidden: { scale: 1, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    transition: { duration: 100 },
  };

  return (
    <Link href={"/rooms/" + hotel.id}>
      <motion.div
        className="bg-white/50 backdrop-blur-xl flex flex-col h-full items-center justify-center text-sm cursor-pointer group rounded-lg shadow-lg hover:shadow-xl transition ease-linear duration-200"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
        }}
      >
        <div className="w-full rounded-t-lg aspect-square overflow-hidden">
          <img
            src={hotel?.image[0]}
            className="w-full select-none h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
          />
        </div>
        <p className="font-bold mt-4">{hotel?.hotel}</p>
        <div className="w-full flex flex-row space-between items-start p-4 pt-2">
          <div className="w-full flex flex-col space-y-1">
            <p className="text-gray-800">{hotel?.location}</p>
            <p className="text-gray-800 font-bold">
              ${hotel?.price / 100}
              <span className="font-[500]">/night</span>
            </p>
          </div>
          <div className="lg:hidden shadow-md cursor-pointer ring-tertiary text-tertiary  py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center group-hover:bg-tertiary group-hover:text-white group-hover:ring-tertiary">
            Book Now
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default HotelSelect;
