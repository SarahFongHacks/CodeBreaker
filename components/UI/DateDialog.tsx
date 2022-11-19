import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { changeReservationDate } from "../../db_func/reservations";
import { getHotelRoom } from "../../db_func/hotelRoom";
import { HotelRoom } from "../../types/types";

const DateDialog = ({ booking, changed, setChanged }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [hotel, setHotel] = useState<HotelRoom | null>(null);

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
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
    setChanged(!changed);
  };

  const getHotel = async () => {
    const hotel = await getHotelRoom(booking.hotelRoomId);
    setHotel(hotel);
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div className=" bg-white/70 backdrop-blur-xl  w-full grid grid-cols-3 gap-8 p-8 justify-between rounded-lg h-64 shadow-lg ring-1 ring-black/20">
      <div className="h-full w-full square overflow-hidden rounded-lg object-cover">
        <img src={hotel?.image} className="object-cover w-full h-full " />
      </div>
      <div className="col-span-2 flex flex-col ">
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Hotel name</h1>
          <h1 className="font-bold text-lg">{hotel?.hotel}</h1>
        </div>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Location</h1>
          <h1 className="font-bold text-lg">{hotel?.location}</h1>
        </div>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-lg ">Room number</h1>
          <h1 className="font-bold text-lg">{hotel?.roomNumber}</h1>
        </div>

        <div className="w-full flex flex-row space-x-2 mt-4 items-center justify-center text-tertiary ring-tertiary ring-1 p-2 rounded-lg font-bold">
          <p>{booking?.startDate && dateHandler(booking?.startDate)}</p>
          <p>-</p>
          <p>{booking?.endDate && dateHandler(booking?.endDate)}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <Dialog.Root>
            <Dialog.Trigger>
              <div className="w-full hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear flex flex-row space-x-2 mt-4 items-center justify-center bg-black text-white p-2 rounded-lg font-bold">
                <p>Edit booking</p>
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
                  <p className="font-bold text-xl mb-8">
                    Edit your reservation
                  </p>
                  <div className="w-full grid grid-cols-2 items-center justify-center gap-8">
                    <div className="flex flex-col">
                      <p className="mb-2">New start date</p>
                      <input
                        type="date"
                        name="start-date"
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
          <div className="w-full flex flex-row hover:shadow-xl hover:scale-[1.02] transition duration-200 ease-linear  cursor-pointer space-x-2 mt-4 items-center justify-center bg-red-500 text-white p-2 rounded-lg font-bold">
            <p>Cancel booking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateDialog;
