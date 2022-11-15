import { useContext, useEffect, useState } from "react";
import ImageCarousel from "./UI/ImageCarousel";
import { createReservation } from "../db_func/reservations";
import { LoginContext } from "../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HotelRoom } from "../types/types";

const ReservationPage = ({ hotel }) => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { user } = useContext(LoginContext);

  const reservationHandler = ({ hotel, user, startDate, endDate }) => {
    createReservation(hotel, user, startDate, endDate).then((res) => {
      // res.error === false && setRegistered(true);
      res.error === false && alert("Hotel was successfully booked!");
    });
  };

  const totalHandler = () => {
    if (startDate && endDate && endDate >= startDate) {
      setError(false);
      const total = (endDate - startDate) / 8640000000;
      if (total >= 0) {
        setTotal((total * hotel.price).toFixed(2));
      }
    } else {
      setError(true);
      setTotal(0);
    }
  };

  useEffect(() => {
    totalHandler();
  }, [startDate, endDate]);

  const excludedDates = [];

  return (
    <div className="bg-gradient-to-b from-white to-tertiary/10 w-full h-screen flex items-center justify-center flex-col p-16">
      <div className="text-primary px-8 rounded-lg text-center my-8">
        <h1 className="text-3xl font-bold">{hotel?.hotel}</h1>
      </div>

      <div className="flex space-x-8 w-full items-center justify-center ">
        <div className="border-2 border-dashed rounded-lg w-fit shadow-lg">
          <ImageCarousel images={hotel?.image} />
        </div>
        <div className="border-2 border-dashed bg-white shadow-lg rounded-lg px-32 h-full flex items-start justify-center flex-col">
          <div className="w-full flex flex-row justify-between my-4">
            <h3 className="text-xl font-bold">Rate</h3>
            <h3 className="text-xl font-bold">
              ${hotel?.price / 100} <span className="font-medium">night</span>
            </h3>
          </div>
          {error && (
            <div className="w-full items-center justify-center flex mb-2 bg-red-500 p-2 rounded-md text-white">
              Invalid dates please try different dates.
            </div>
          )}
          <form className="flex flex-col w-80">
            <div className="check-in">
              <label>Check in: </label>
              <DatePicker
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                excludeDates={excludedDates}
                minDate={new Date()}
              />
              {/* <input
                type="date"
                name="checkin-date"
                value={checkin}
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckin(e.target.value)}
              /> */}
            </div>
            <div className="check-out">
              <label>Check out: </label>
              <DatePicker
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={new Date()}
              />
              {/* <input
                type="date"
                name="checkout-date"
                value={checkout}
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckout(e.target.value)}
              /> */}
            </div>
            <div className="w-full h-[2px] bg-black/20 my-4 " />
            <div className="mb-4 w-full text-xl font-bold flex justify-between items-center">
              <h4>Total </h4>
              <h4>${total} </h4>
            </div>

            <div
              className="w-full shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-tertiary to-[#79A1F7] font-bold text-white   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary"
              onClick={() =>
                reservationHandler({ hotel, user, startDate, endDate })
              }
            >
              Reserve
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
