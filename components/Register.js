import React, { useState } from "react";
import Link from "next/link";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start">
      <div className="w-full h-44 mb-16 overflow-hidden relative">
        <img
          src="/assets/header.jpeg"
          className="object-cover w-full absolute bottom-0"
        />
      </div>
      <div className=" flex-col flex items-center justify-center space-y-4 w-96">
        <div className="bg-primary text-white p-4 px-8 rounded-lg ">
          <h1 className="text-2xl">Register</h1>
        </div>
        <form className="flex flex-col space-y-4 w-full">
          <input
            id="username"
            type="text"
            autoComplete="off"
            className=" rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            id="password"
            type="password"
            className=" rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="cursor-pointer hover:bg-white hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md w-full bg-tertiary text-white p-2 flex items-center justify-center shadow-md">
            Register
          </div>
        </form>
        <Link href="/">
          <div className="whitespace-nowrap underline cursor-pointer">
            Back to homepage
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;
