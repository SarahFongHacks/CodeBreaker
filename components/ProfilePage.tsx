import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context";
import DateDialog from "./UI/DateDialog";
import LoginButton from "./UI/LoginButton";

const ProfilePage = () => {
  const { user, setUser } = useContext(LoginContext);
  const [dateChange, setDateChange] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [dateChange]);

  return (
    <div className="w-full min-h-screen flex items-start justify-center p-36">
      <div className="w-full p-8 overflow-hidden absolute top-0 flex justify-end">
        <LoginButton color="black" />
      </div>
      {user ? (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-5xl font-bold mb-12">Your Profile</p>
          <div className="grid grid-cols-3 w-full gap-4">
            <div className="shadow-xl ring-1 ring-black/20 rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
              <p className="text-xl mb-2 text-center">email</p>
              <p className="text-2xl font-bold text-center">{user?.email}</p>
            </div>
            <div className="shadow-xl ring-1 ring-black/20 rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
              <p className="text-xl mb-2 text-center">userid</p>
              <p className="text-2xl font-bold text-center">{user?.id}</p>
            </div>
            <div className="shadow-xl ring-1 ring-black/20 rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
              <p className="text-xl mb-2 text-center">reward points</p>
              <p className="text-2xl font-bold text-center">
                {user?.rewardPoints}
              </p>
            </div>
          </div>
          <div className="w-full flex-col mt-12">
            <p className="text-3xl font-bold mb-4">
              Bookings ({user?.currentBooking?.length})
            </p>
            <div className="w-full grid grid-cols-2 gap-4">
              {user?.currentBooking?.map((booking) => (
                <DateDialog
                  booking={booking}
                  changed={dateChange}
                  setChanged={setDateChange}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-3xl font-bold mb-12">
          Please login to view your profile
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
