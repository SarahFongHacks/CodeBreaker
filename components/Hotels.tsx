import React from "react";
import useHotels from "../hooks/useHotels";

const Hotels = () => {
  const hotels = useHotels();
  console.log(hotels);

  return (
    <div className="w-full h-screen grid grid-cols-4">
      {hotels.map((hotel) => {
        return (
          <div className="flex flex-col items-center justify-center ">
            {/* <div className="w-24 h-24 rounded-lg square bg-secondary" /> */}
            <p>{hotel.hotel}</p>
            <p>Price: ${hotel.price}</p>
            <p>Location: {hotel.location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Hotels;
