import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { changeReservationDate } from "../../db_func/reservations";

const DateDialog = ({ booking }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US");
  };

  const container = {
    hidden: { y: "-10%", x: "-50%" },
    visible: {
      y: "-50%",
      x: "-50%",
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  const changeReservationDateHandler = () => {
    changeReservationDate(booking, new Date(checkin), new Date(checkout));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="hover:scale-[1.02] transition duration-200 ease-linear hover:shadow-xl w-full flex items-center p-16 justify-center flex-col rounded-lg h-48 shadow-lg ring-1 ring-black/20">
          <div className="w-full justify-between flex flex-row">
            <p>Bookingid</p>
            <p className="font-bold ">{booking?.id}</p>
          </div>
          <div className="w-full justify-between flex flex-row">
            <p>Roomid</p>
            <p className="font-bold ">{booking?.hotelRoomId}</p>
          </div>
          <div className="w-full flex flex-row space-x-2 mt-4 items-center justify-center bg-tertiary text-white p-2 rounded-lg font-bold">
            <p>{booking?.startDate && dateHandler(booking?.startDate)}</p>
            <p>-</p>
            <p>{booking?.endDate && dateHandler(booking?.endDate)}</p>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal className="flex h-screen w-full items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content>
          <motion.div
            className="flex flex-col p-16 items-center justify-center overflow-y-scroll fixed left-1/2 top-1/2 w-8/12 max-w-[54rem] bg-white rounded-lg"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <p className="font-bold text-xl mb-8">Edit your reservation</p>
            <div className="w-full grid grid-cols-2 items-center justify-center gap-8">
              <div className="flex flex-col">
                <p className="mb-2">New start date</p>
                <input
                  type="date"
                  name="start-date"
                  min="2022-11-18"
                  max="2022-11-19"
                  className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <p className="mb-2">New end date</p>
                <input
                  type="date"
                  name="end-date"
                  className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>
            <Dialog.Close>
              <div
                onClick={() => changeReservationDateHandler()}
                className="mt-8 px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white  space-x-2"
              >
                Edit reservation
              </div>
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DateDialog;
