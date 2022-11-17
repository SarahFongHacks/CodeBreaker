import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "../auth/auth";
import { db, auth } from "../pages";
import { useRouter } from "next/router";
import { LoginContext } from "../context";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(LoginContext);
  const router = useRouter();

  const signInHandler = (e, auth, email, password, db) => {
    e.preventDefault();
    signIn(auth, email, password, db).then((res) => {
      res.error && setError(res.error.errorMessage);
      res.user && setUser(res.user);
    });
  };

  useEffect(() => {
    user && router.back();
  }, [user]);

  return (
    <motion.div
      className="w-full h-screen bg-gradient-to-b from-white to-tertiary/30 flex flex-col items-center justify-center relative"
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
        <div className="text-primary px-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold">Welcome to Booker's Paradise</h1>
        </div>
        {error && (
          <div className="bg-red-500 text-white px-2 py-2 rounded-md text-sm flex items-center">
            <BiErrorCircle className="mx-2 w-8 square flex items-center justify-center text-lg" />
            <p className="mr-4">{error}</p>
          </div>
        )}
        <form
          className="flex flex-col w-full items-start"
          onSubmit={(e) => signInHandler(e, auth, email, password, db)}
        >
          <input type="submit" className="hidden" />
          <label for="email" className="text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            autoComplete="off"
            className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Enter your email address..."
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label for="password" className="text-sm mb-1 ">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            className="shadow-md w-full cursor-pointer  hover:bg-white  hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center"
            onClick={(e) => signInHandler(e, auth, email, password, db)}
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
      {/* <div className="w-full h-16 bg-gradient-to-r from-tertiary to-tertiary absolute bottom-0 blur-[100px] opacity-100 z-50" /> */}
    </motion.div>
  );
};

export default Login;
