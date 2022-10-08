import React from "react";
import useHotels from "../hooks/useHotels";

const Hotels = () => {
  const hotels = useHotels();
  console.log(hotels);

  return (
    <div className="w-full min-h-screen grid grid-cols-4 gap-4 p-8 ">
      {hotels.map((hotel) => {
        return (
          <div className="flex flex-col items-center justify-center text-sm p-4 cursor-pointer group ">
            <div className="w-full rounded-lg aspect-square bg-red-500 overflow-hidden">
              <img
                src="./assets/test.webp"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
              />
            </div>

            <p className="font-bold mt-4">{hotel.hotel}</p>
            <p className="text-gray-800 mt-2">Price: ${hotel.price}</p>
            <p className="text-gray-800">Location: {hotel.location}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Hotels;
