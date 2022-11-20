import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context";
import BackButton from "./UI/BackButton";
import DateDialog from "./UI/DateDialog";
import LoginButton from "./UI/LoginButton";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user, setUser } = useContext(LoginContext);
  const [dateChange, setDateChange] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [dateChange]);

  const profileInfo = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const container = {
    hidden: { y: 0 },
    visible: {
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.5, delayChildren: 1 },
    },
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="w-full min-h-screen flex bg-gradient-to-b from-white to-tertiary/40 items-start justify-center p-36 ">
      {/* <img
        src="/assets/gradient.jpeg"
        className="w-full fixed h-screen top-0 -z-10"
      /> */}
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <BackButton href="/hotels" />
        <LoginButton color="black" />
      </div>
      {user ? (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-5xl font-bold mb-12">Your Profile</p>
          <motion.div
            className="grid grid-cols-2 w-full gap-4"
            initial="hidden"
            animate="visible"
            variants={profileInfo}
            exit={{ opacity: 0 }}
          >
            <div className="shadow-xl ring-1 bg-white/70 backdrop-blur-xl ring-black/20 rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
              <p className="text-xl mb-2 text-center">email</p>
              <p className="text-2xl font-bold text-center">{user?.email}</p>
            </div>
            <div className="shadow-xl ring-1 bg-white/70 backdrop-blur-xl ring-black/20 rounded-lg p-8 py-16 flex items-center justify-center w-full flex-col">
              <p className="text-xl mb-2 text-center">reward points</p>
              <p className="text-2xl font-bold text-center">
                {user?.rewardPoints}
              </p>
            </div>
          </motion.div>
          <div className="w-full flex-col mt-12">
            <p className="text-3xl font-bold mb-4">
              Bookings ({user?.currentBooking?.length})
            </p>
            <motion.div
              className="w-full grid grid-cols-1 gap-4"
              initial="hidden"
              animate="visible"
              variants={container}
              exit={{ opacity: 0 }}
            >
              {user?.currentBooking?.map((booking) => (
                <motion.div variants={item}>
                  <DateDialog
                    booking={booking}
                    changed={dateChange}
                    setChanged={setDateChange}
                  />
                </motion.div>
              ))}
            </motion.div>
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
