import Link from "next/link";
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { LoginContext } from "../context";
import { signout } from "../auth/auth";
import { auth } from "../pages";
import { motion } from "framer-motion";
import Image from "next/image";

const Main = () => {
  const { user, setUser } = useContext(LoginContext);

  const signOutHandler = (auth) => {
    signout(auth);
    setUser(undefined);
  };

  return (
    <motion.div
      className="w-full h-screen fixed flex flex-col items-center justify-start bg-black"
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
        {user ? (
          <div
            className="shadow-md cursor-pointer ring-white/50 hover:ring-white ring-1 transition ease-linear duration-200 rounded-md text-white  py-3 px-5 flex items-center justify-center"
            onClick={() => signOutHandler(auth)}
          >
            Logout
          </div>
        ) : (
          <Link href="/login">
            <div className="shadow-md cursor-pointer ring-white/50 hover:ring-white ring-1 transition ease-linear duration-200 rounded-md text-white  py-3 px-5 flex items-center justify-center">
              Login
            </div>
          </Link>
        )}
      </div>

      <div className="w-full relative flex flex-col items-center justify-center mt-64">
        <h1 className="text-8xl font-bold tracking-tighter text-white pb-2">
          Booker's Paradise
        </h1>
        <p className="text-white tracking-widest uppercase text-xl">
          Find your escape
        </p>
      </div>
      <div className=" absolute bottom-16 w-full items-center flex justify-center  z-10">
        <Link href="/hotels">
          <BsArrowDownCircle className="cursor-pointer text-5xl hover:scale-110 transition duration-200 ease-linear text-white/50 hover:text-white" />
        </Link>
      </div>
      <div className="w-full h-16 bg-gradient-to-r from-white to-white absolute bottom-0 blur-[100px] opacity-30 z-50" />
    </motion.div>
  );
};

export default Main;
