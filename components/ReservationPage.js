import { useState } from "react";
import ImageCarousel from "./UI/ImageCarousel";

const ReservationPage = ({ hotel }) => {
  const [checkin, setCheckin] = useState();
  const [checkout, setCheckout] = useState();
  const [numGuest, setNumGuest] = useState();

  const reservationHandler = ({ hotel, user, checkin, checkout }) => {
    createReservation(hotel, user, new Date(checkin), new Date(checkout)).then(
      (res) => {
        // res.error === false && setRegistered(true);
        res.error === false && alert("Hotel was successfully booked!");
      }
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-tertiary/10 w-full h-screen flex items-center justify-center flex-col p-16">
      <div className="text-primary px-8 rounded-lg text-center my-8">
        <h1 className="text-3xl font-bold">{hotel?.hotel}</h1>
      </div>

      <div className="flex justify-around w-full ">
        <div className="border-2 border-dashed rounded-lg w-fit shadow-lg">
          <ImageCarousel images={hotel?.image} />
        </div>
        <div className="border-2 border-dashed bg-white shadow-lg rounded-lg px-32 flex items-start justify-center flex-col">
          <div className="text-center my-4">
            <h3 className="text-xl font-bold">
              ${hotel?.price / 100} <span className="font-medium">night</span>
            </h3>
          </div>
          <form className="flex flex-col w-80">
            <div className="check-in">
              <label>Check in: </label>
              <input
                type="date"
                name="checkin-date"
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckin(e.target.value)}
              />
            </div>
            <div className="check-out">
              <label>Check out: </label>
              <input
                type="date"
                name="checkout-date"
                className="w-full rounded-md px-3 mb-4 py-2 placeholder-black/50 focus:outline-none ring-1 ring-black focus:ring-tertiary text-black"
                onChange={(e) => setCheckout(e.target.value)}
              />
            </div>
            <div className="w-full h-[2px] bg-black/20 my-4 " />
            <div className="mb-4 w-full text-xl font-bold flex justify-between items-center">
              <h4>Total </h4>
              <h4>${hotel?.price / 100} </h4>
            </div>
            <div
              className="w-full shadow-lg hover:shadow-xl cursor-pointer hover:scale-[1.01] bg-gradient-to-r from-tertiary to-[#79A1F7] font-bold text-white   py-3 px-5 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary"
              onClick={() =>
                // registrationHandler({ hotel, user, checkin, checkout })
                alert("Hotel was successfully booked!")
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
