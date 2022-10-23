import Link from "next/link";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { auth } from "../pages";
import { motion } from "framer-motion";
import Image from "next/image";
import LoginButton from "./UI/LoginButton";

const Main = () => {
  return (
    <motion.div
      className="w-full h-screen fixed flex flex-col items-center justify-start bg-black select-none"
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/assets/home.jpg"
        layout="fill"
        width="100vw"
        height="100vh"
        className="object-cover w-full h-full fixed blur-sm opacity-60"
      />
      <div className="w-full p-8 overflow-hidden relative flex justify-end">
        <LoginButton color="white" />
      </div>

      <div className="w-full relative flex flex-col items-center justify-center mt-64">
        <div className="overflow-hidden">
          <motion.h1
            className="text-8xl font-bold tracking-tighter text-white pb-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.4, duration: 0.5 },
            }}
          >
            Booker's Paradise
          </motion.h1>
        </div>
        <p className="text-white tracking-widest uppercase text-xl">
          Find your escape
        </p>
      </div>
      <div className=" absolute bottom-16 w-full items-center flex justify-center  z-10">
        <Link href="/hotels">
          <motion.div
            className=""
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
                duration: 0.5,
                bounce: 0.5,
              },
            }}
          >
            <BsArrowDownCircle className="cursor-pointer text-5xl hover:scale-110 transition duration-200 ease-linear text-white/50 hover:text-white" />
          </motion.div>
        </Link>
      </div>
      <div className="w-full h-16 bg-gradient-to-r from-white to-white absolute bottom-0 blur-[100px] opacity-30 z-50" />
    </motion.div>
  );
};

export default Main;
