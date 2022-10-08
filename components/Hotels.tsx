import React from "react";
import useHotels from "../hooks/useHotels";

const Hotels = () => {
  const hotels = useHotels();
  console.log(hotels);

  return (
    <div>
      {hotels.map((hotel) => {
        return (
          <div>
            <p>{hotel.hotel}</p>
            <p>{hotel.price}</p>
            <p>{hotel.capacity}</p>
            <p>{hotel.roomNumber}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Hotels;
