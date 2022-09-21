import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full h-screen flex-col flex items-center justify-center space-y-4">
      <h1 className="text-2xl">Register</h1>
      <form className="flex flex-col space-y-4 w-64">
        <input
          id="username"
          type="text"
          autoComplete="off"
          className=" rounded-md px-2 py-2 placeholder-gray-400 focus:outline-none border-[1px] border-black"
          placeholder="Email"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          id="password"
          type="password"
          className=" rounded-md px-2 py-2 placeholder-gray-400 focus:outline-none border-[1px] border-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className="cursor-pointer rounded-md w-full bg-black text-white p-2 flex items-center justify-center">
          Register
        </div>
      </form>
    </div>
  );
};

export default Register;