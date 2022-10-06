import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { register } from "../auth/auth";
import { auth } from "../pages";
import { BiErrorCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { LoginContext, useAppContext } from "../context";
import {db} from "../pages" 

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { userCred, setUserCred } = useContext(LoginContext);
  const router = useRouter();

  const registerHandler = (auth, email, password) => {
    register(auth, email, password, db).then((res) => {
      res.error && setError(res.error.errorMessage);
      res.userCred && setUserCred(res.userCred);
    });
  };

  useEffect(() => {
    Object.keys(userCred).length !== 0 && router.push("/");
  }, [userCred]);

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
        {error && (
          <div className="bg-red-300 px-2 py-2 rounded-md text-sm flex items-center">
            <BiErrorCircle className="mx-2 w-8 square flex items-center justify-center text-lg" />
            <p className="mr-4">{error}</p>
          </div>
        )}
        <form className="flex flex-col space-y-4 w-full">
          <input
            id="email"
            type="email"
            autoComplete="off"
            className=" rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            id="password"
            type="password"
            className=" rounded-md px-3 py-2 placeholder-black focus:outline-none bg-secondary"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div className="w-full flex space-x-2 items-center justify-center">
            <Link href="/">
              <div className="cursor-pointer hover:bg-tertiary hover:ring-1 hover:ring-tertiary hover:text-white transition ease-linear ring-1 duration-200 rounded-md w-full bg-white text-tertiary ring-tertiary p-2 flex items-center justify-center shadow-md">
                Back
              </div>
            </Link>
            <div
              className="cursor-pointer hover:bg-white hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md w-full bg-tertiary text-white p-2 flex items-center justify-center shadow-md"
              onClick={() => registerHandler(auth, email, password)}
            >
              Register
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
