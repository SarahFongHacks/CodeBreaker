import Link from "next/link";
import React, { useContext } from "react";
import { signout } from "../auth/auth";
import { LoginContext } from "../context";
import { auth } from "../pages";

const LoginButton = ({ color }) => {
  const { user, setUser } = useContext(LoginContext);

  const signOutHandler = (auth) => {
    signout(auth);
    setUser(undefined);
  };

  return (
    <div>
      {user ? (
        <div
          className={`${
            color === "white"
              ? "ring-white/50 hover:ring-white text-white"
              : "ring-black/50 hover:ring-black text-black"
          } "shadow-md cursor-pointer  ring-1 transition ease-linear duration-200 rounded-md   py-3 px-5 flex items-center justify-center"`}
          onClick={() => signOutHandler(auth)}
        >
          Logout
        </div>
      ) : (
        <Link href="/login">
          <div
            className={`${
              color === "white"
                ? "ring-white/50 hover:ring-white text-white"
                : "ring-black/50 hover:ring-black text-black"
            } "shadow-md cursor-pointer  ring-1 transition ease-linear duration-200 rounded-md   py-3 px-5 flex items-center justify-center"`}
          >
            Login
          </div>
        </Link>
      )}
    </div>
  );
};

export default LoginButton;
