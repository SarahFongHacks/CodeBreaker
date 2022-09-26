import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "../auth/auth";
import { auth } from "../pages";

const Login = () => {
  const [email, setEmail] = useState("");
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
        <div className="bg-primary text-white p-4 px-8 rounded-lg">
          <h1 className="text-2xl">Welcome to Bookers Paradise!</h1>
        </div>
        <form className="flex flex-col space-y-4 w-full items-center">
          <input
            id="email"
            type="text"
            autoComplete="off"
            className="w-full rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            id="password"
            type="password"
            className="w-full rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            className="shadow-md cursor-pointer hover:bg-white w-52  hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center"
            onClick={() => signIn(auth, email, password)}
          >
            Login
          </div>
        </form>
        <div className="whitespace-nowrap ">
          Don't have an account?{" "}
          <Link href="/register">
            <span className="text-tertiary  cursor-pointer">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
