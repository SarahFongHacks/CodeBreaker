import React from "react";
import useHotels from "../hooks/useHotels";

const Hotels = () => {
  const hotels = useHotels();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-16">
      <h1 className="font-bold text-4xl mb-8">Hotels</h1>
      {/* <div className="w-full items-center justify-start flex mb-8">
        <input className="w-full rounded-md p-3 h-12 border-[2px] border-secondary mr-4 focus:outline-none" />
        <div className="w-44 h-12 bg-secondary p-3 rounded-md flex items-center justify-center cursor-pointer">
          <p className="">Filter</p>
        </div>
      </div> */}
      <div className="w-full min-h-screen grid grid-cols-3 gap-8 ">
        {hotels.map((hotel) => {
          return (
            <div className="flex flex-col items-center justify-center text-sm cursor-pointer group ">
              <div className="w-full rounded-lg aspect-square bg-red-500 overflow-hidden">
                <img
                  src="./assets/test.webp"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
                />
              </div>
              <p className="font-bold mt-4">{hotel.hotel}</p>
              <div className="w-full flex flex-row space-between items-start">
                <div className="w-full flex flex-col">
                  <p className="text-gray-800 mt-2">Price: ${hotel.price}</p>
                  <p className="text-gray-800">Location: {hotel.location}</p>
                </div>
                <div className="shadow-md cursor-pointer ring-secondary text-secondary  py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:ring-secondary">
                  Book Now
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hotels;
