import React, { useState } from "react";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [enableLocation, setEnableLocation] = useState(false);

  return (
    <div className="w-full grid grid-cols-6 rounded-lg ring-1 ring-black/20 shadow-lg overflow-hidden gap-4 p-8">
      <div className="w-full flex flex-col items-start justify-center col-span-4">
        <p className="font-bold mb-1">Location</p>
        <div className="w-full flex flex-row">
          <input
            className="w-3/4 text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-text-black/20"
            placeholder="Enter Location..."
          ></input>
        </div>
      </div>
      {/* <div className="w-full flex flex-col items-center justify-start">
        <p className="font-bold text-sm mb-1">Beds</p>
        <div className="flex flex-row items-center space-x-2 w-full justify-center">
          <div className="w-6 h-6 ring-1 ring-black rounded-full" />
          <p className="">1</p>
          <div className="w-6 h-6 ring-1 ring-black rounded-full" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <p className="font-bold text-sm mb-1">Bathrooms</p>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <p className="font-bold text-sm mb-1">Capacity</p>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <p className="font-bold text-sm mb-1">Hotel</p>
        <input className="ring-1 ring-black rounded-sm"></input>
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        <p className="font-bold text-sm mb-1">Price Range</p>
      </div> */}
    </div>
  );
};

export default Filter;
