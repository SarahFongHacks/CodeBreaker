import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { register } from "../auth/auth";
import { auth } from "../pages";
import { BiErrorCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { LoginContext, useAppContext } from "../context";
import { db } from "../pages";
import { motion } from "framer-motion";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(LoginContext);
  const router = useRouter();

  const registerHandler = (e, auth, email, password) => {
    e.preventDefault();
    register(auth, email, password, db).then((res) => {
      res.error && setError(res.error.errorMessage);
      res.user && setUser(res.user);
    });
  };

  useEffect(() => {
    user && router.push("/hotels");
  }, [user]);

  return (
    <motion.div
      className="w-full h-screen bg-gradient-to-b from-white to-tertiary/30 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <div className="w-full h-44 mb-16 overflow-hidden relative">
        <img
          src="/assets/header.jpeg"
          className="object-cover w-full absolute bottom-0"
        />
      </div> */}
      <div className=" flex-col flex items-center justify-center space-y-4 w-96">
        <div className=" text-primary px-8 rounded-lg ">
          <h1 className="text-4xl font-bold">Register</h1>
        </div>
        {error && (
          <div className="bg-red-500 px-2 py-2 rounded-md text-sm flex items-center">
            <BiErrorCircle className="mx-2 w-8 square flex items-center justify-center text-lg" />
            <p className="mr-4">{error}</p>
          </div>
        )}
        <form
          className="flex flex-col w-full"
          onSubmit={(e) => registerHandler(e, auth, email, password, db)}
        >
          <input type="submit" className="hidden" />
          <label for="email" className="text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            className="w-full rounded-md px-3 py-2 mb-4 placeholder-black/60 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label for="password" className="text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md px-3 py-2 mb-4 placeholder-black/60 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="w-full flex space-x-2 items-center justify-center ">
            <Link href="/">
              <div className="cursor-pointer hover:bg-tertiary hover:ring-1  hover:ring-tertiary hover:text-white transition ease-linear ring-1 duration-200 rounded-md w-full bg-white text-tertiary ring-tertiary p-2 flex items-center justify-center shadow-md">
                Back
              </div>
            </Link>
            <div
              className="cursor-pointer hover:bg-white hover:ring-1  hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md w-full bg-tertiary text-white p-2 flex items-center justify-center shadow-md"
              onClick={(e) => registerHandler(e, auth, email, password)}
            >
              Register
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
