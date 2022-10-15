import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "../auth/auth";
import { db, auth } from "../pages";
import { useRouter } from "next/router";
import { LoginContext } from "../context";
import { BiErrorCircle } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(LoginContext);
  const router = useRouter();
  console.log(user);

  const signInHandler = (auth, email, password) => {
    signIn(auth, email, password).then((res) => {
      res.error && setError(res.error.errorMessage);
      res.user && setUser(res.user);
    });
  };

  useEffect(() => {
    user && router.push("/");
  }, [user]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      {/* <div className="w-full h-44 mb-16 overflow-hidden relative">
        <img
          src="/assets/header.jpeg"
          className="object-cover w-full absolute bottom-0"
        />
      </div> */}
      <div className=" flex-col flex items-center justify-center space-y-4 ">
        <div className="bg-primary text-white p-4 px-8 rounded-lg text-center">
          <h1 className="text-2xl">Welcome to Bookers Paradise</h1>
        </div>
        {error && (
          <div className="bg-red-300 px-2 py-2 rounded-md text-sm flex items-center">
            <BiErrorCircle className="mx-2 w-8 square flex items-center justify-center text-lg" />
            <p className="mr-4">{error}</p>
          </div>
        )}
        <form className="flex flex-col space-y-4 w-full items-center">
          <input
            id="email"
            type="text"
            autoComplete="off"
            className="w-full rounded-md px-3 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            id="password"
            type="password"
            className="w-full rounded-md px-3 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <div
            className="shadow-md cursor-pointer hover:bg-white w-52  hover:ring-1 hover:ring-tertiary hover:text-tertiary transition ease-linear duration-200 rounded-md bg-tertiary text-white p-2 flex items-center justify-center"
            onClick={() => signInHandler(auth, email, password)}
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
    </div>
  );
};

export default Login;
