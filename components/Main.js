import Link from "next/link";
import React from "react";
import { useContext, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { LoginContext } from "../context";

const Main = () => {
  const { user } = useContext(LoginContext);

  return (
    <div className="w-full h-screen bg-primary fixed flex flex-col items-center justify-start">
      {/* <img
        src="./assets/home.jpg"
        className="object-cover w-full h-full 0 fixed opacity-60 "
      /> */}
      <div className="w-full p-8 overflow-hidden relative flex justify-end">
        <Link href="/login">
          <div className="shadow-md cursor-pointer ring-white/50 hover:ring-white ring-1 transition ease-linear duration-200 rounded-md text-white  py-3 px-5 flex items-center justify-center">
            {user ? "Logout" : "Login"}
          </div>
        </Link>
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
      <div className="w-full h-16 bg-gradient-to-r from-secondary to-secondary absolute bottom-0 blur-[100px] opacity-100 z-50" />
    </div>
  );
};

export default Main;
