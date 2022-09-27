import Link from "next/link";
import React from "react";
import { useContext, useState } from "react";
import { LoginContext } from "../context";

const Main = () => {
  const { userCred } = useContext(LoginContext);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Link href="/login">
        <div className="cursor-pointer hover:bg-white hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center w-64">
          {Object.keys(userCred).length !== 0 ? "Logout" : "Login"}
        </div>
      </Link>
      <div>{Object.keys(userCred).length !== 0 && userCred.email}</div>
    </div>
  );
};

export default Main;
