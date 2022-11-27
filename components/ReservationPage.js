import { useContext, useEffect, useState } from "react";
import ImageCarousel from "./UI/ImageCarousel";
import { createReservation } from "../db_func/reservations";
import { LoginContext } from "../context";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HotelRoom } from "../types/types";
import { createProduct } from "../stripe/stripe_product";
import { useRouter } from "next/router";
import BackButton from "./UI/BackButton";
import LoginButton from "./UI/LoginButton";
import PuffLoader from "react-spinners/PuffLoader";

const ReservationPage = ({ hotel }) => {
  var today = new Date();

  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(today);
  var minCheckout = new Date(startDate);
  minCheckout.setDate(minCheckout.getDate() + 1);
  const [endDate, setEndDate] = useState(minCheckout);
  const [disabled, setDisabled] = useState(true);
  const [loader, setLoader] = useState(false);

  const { user } = useContext(LoginContext);

  const router = useRouter();

  const reservationHandler = async ({ hotel, user, startDate, endDate }) => {
    setLoader(true);
    const data = await createProduct(hotel, startDate, endDate, total * 100);
    if (data) {
      const data2 = await fetch("/api/checkout_sessions", {
        method: "POST",
        body: JSON.stringify({
          priceId: data.data.price.id,
          userId: user.id,
          hotelId: hotel.id,
          startDate: startDate,
          endDate: endDate,
          price: hotel.price,
        }),
      });
      const stripeData = await data2.json();
      setLoader(false);
      router.push(stripeData.url);
    }
  };

  const totalHandler = () => {
    if (startDate && endDate && endDate > startDate) {
      setError(false);
      const total = (endDate - startDate) / 8640000000;
      if (total >= 0) {
        setTotal((total * hotel?.price).toFixed(2));
      }
    } else {
      setError(true);
      setTotal(0);
    }
  };

  useEffect(() => {
    totalHandler();
  }, [startDate, endDate]);

  useEffect(() => {
    if (user.rewardPoints / 40 >= total) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [total]);

  const excludedDates = [];
  for (let i = 0; i < hotel?.reservations.length; i++) {
    
    // excludedDates.push({
    //   start: new Date(hotel.reservations[i].startDate),
    //   end: new Date(hotel.reservations[i].endDate),
    // });
    //console.log(new Date(hotel.reservations[i].startDate) + ", " + new Date(hotel.reservations[i].endDate));
  }

  for (let i = 0; i < user?.currentBooking.length; i++) {
    const dateToAdd = new Date(user.currentBooking[i].startDate);
    while (dateToAdd <= user.currentBooking[i].endDate) {
      excludedDates.push(new Date(dateToAdd));
      dateToAdd.setDate(dateToAdd.getDate() + 1);
    }

    console.log(
      new Date(user.currentBooking[i].startDate) +
        ", " +
        new Date(user.currentBooking[i].endDate)
    );
  }

  excludedDates.sort(function (a, b) {
    const d1 = new Date(a);
    const d2 = new Date(b);
    return d1 - d2;
  });

  for (let i = 0; i < excludedDates.length; i++) {
    console.log(excludedDates[i]);
  }

  var maxCheckout = null;
  for (let i = 0; i < excludedDates.length; i++) {
    if (minCheckout < excludedDates[i]) {
      maxCheckout = new Date(excludedDates[i]);
      break;
    }
  }

  console.log("Max: " + maxCheckout);
  

  return (
    <div className="relative w-full h-screen flex items-center justify-center flex-col p-16 bg-gradient-to-b from-white to-tertiary/40">
      <div className="text-primary px-8 rounded-lg text-center my-8">
        <h1 className="text-3xl font-bold">{hotel?.hotel}</h1>
      </div>
      <div className="absolute left-0 top-0 flex w-full items-center justify-between p-8">
        <BackButton href="/hotels" />
        <LoginButton color="black" />
      </div>
      <div className="flex space-x-8 w-full items-center justify-center ">
        <div className="border-2 border-dashed rounded-lg w-fit shadow-lg">
          <ImageCarousel images={hotel?.image} />
        </div>
        <div className="border-2 border-dashed bg-white/50 backdrop-blur-xl shadow-lg rounded-lg px-32 h-full flex items-start justify-center flex-col">
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
                //excludeDateIntervals={disableDateRange}
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
                excludeDates={excludedDates}
                //excludeDateIntervals={disableDateRange}
                onChange={(date) => setEndDate(date)}
                minDate={minCheckout}
                maxDate={maxCheckout}
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
              className="relative w-full shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-tertiary to-[#79A1F7] font-bold text-white   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary"
              onClick={() =>
                reservationHandler({ hotel, user, startDate, endDate })
              }
            >
              <p>Reserve</p>
              {loader && (
                <div className="absolute right-4">
                  <PuffLoader
                    color={"#ffffff"}
                    loading={loader}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>
            <div
              className={`${
                disabled
                  ? "cursor-not-allowed bg-black text-white/50"
                  : "bg-gradient-to-r from-gray-800 to-gray-500 hover:scale-[1.01] hover:shadow-xl text-white "
              } w-full  mt-4 select-none shadow-lg  cursor-pointer  font-bold   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary`}
              // onClick={() =>
              //   reservationHandler({ hotel, user, startDate, endDate })
              // }
            >
              Reserve with Rewards Points
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
