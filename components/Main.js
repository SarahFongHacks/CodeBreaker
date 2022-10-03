import Link from "next/link";
import React from "react";
import { useContext, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { LoginContext } from "../context";

const Main = () => {
  const { userCred } = useContext(LoginContext);

  return (
    <div className="w-full h-screen bg-black fixed">
      <img
        src="./assets/home.jpg"
        className="object-cover w-full h-full 0 fixed opacity-60 "
      />
      <div className="w-full h-full relative flex flex-col items-center justify-center z-10">
        <h1 className="text-7xl font-bold tracking-tighter text-white pb-2">
          Booker's Paradise
        </h1>
        <p className="text-white tracking-widest uppercase ">
          Find your esacpe
        </p>
        <div className=" absolute bottom-16 w-full items-center flex justify-center text-white">
          <Link href="/login">
            <BsArrowDownCircle className="cursor-pointer text-5xl" />
          </Link>
        </div>
      </div>
      {/* <Link href="/login">
        <div className="cursor-pointer hover:bg-white hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center w-64">
          {Object.keys(userCred).length !== 0 ? "Logout" : "Login"}
        </div>
      </Link>
      <div>{Object.keys(userCred).length !== 0 && userCred.email}</div> */}
    </div>
  );
};

export default Main;
