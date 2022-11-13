import React, { useContext } from "react";
import { LoginContext } from "../context";
import LoginButton from "./UI/LoginButton";

const ProfilePage = () => {
  const { user } = useContext(LoginContext);

  console.log(user);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full p-8 overflow-hidden absolute top-0 flex justify-end">
        <LoginButton color="white" />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-5xl font-bold mb-12">Your Profile</p>
        <div className="grid grid-cols-3 w-[62rem] gap-8">
          <div className="shadow-xl rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
            <p className="text-xl mb-2 text-center">email</p>
            <p className="text-2xl font-bold text-center">{user.email}</p>
          </div>
          <div className="shadow-xl rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
            <p className="text-xl mb-2 text-center">userid</p>
            <p className="text-2xl font-bold text-center">{user.id}</p>
          </div>
          <div className="shadow-xl rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
            <p className="text-xl mb-2 text-center">number of bookings</p>
            <p className="text-2xl font-bold text-center">
              {user.currentBooking.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
