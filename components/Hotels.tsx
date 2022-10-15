import React from "react";
import useHotels from "../hooks/useHotels";
import Hotel from "./Hotel";

const Hotels = () => {
  const hotels = useHotels();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-16">
      <h1 className="font-bold text-4xl mb-8">Hotels</h1>
      {/* <div className="w-full items-center justify-start flex mb-8">
        <input className="w-full rounded-md p-3 h-12 border-[2px] border-secondary mr-4 focus:outline-none" />
        <div className="w-44 h-12 bg-secondary p-3 rounded-md flex items-center justify-center cursor-pointer">
          <p className="">Filter</p>
        </div>
      </div> */}
      <div className="w-full min-h-screen grid grid-cols-3 gap-8 items-start justify-center">
        {hotels.map((hotel) => {
          return <Hotel hotel={hotel} />;
        })}
      </div>
    </div>
  );
};

export default Hotels;
