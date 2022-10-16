import Link from "next/link";
import React from "react";

const HotelSelect = ({ hotel }) => {
  return (
    <Link href={"/rooms/" + hotel.id}>
      <div className="flex flex-col items-center justify-center text-sm cursor-pointer group ">
        <div className="w-full rounded-lg aspect-square overflow-hidden">
          <img
            src={hotel.image[0]}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
          />
        </div>
        <p className="font-bold mt-4">{hotel.hotel}</p>
        <div className="w-full flex flex-row space-between items-start mt-2">
          <div className="w-full flex flex-col space-y-1">
            <p className="text-gray-800">{hotel.location}</p>
            <p className="text-gray-800 font-bold">
              ${hotel.price / 100}
              <span className="font-[500]">/night</span>
            </p>
          </div>
          <div className="shadow-md cursor-pointer font-bold ring-tertiary text-tertiary  py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center group-hover:bg-tertiary group-hover:text-white group-hover:ring-tertiary">
            Book Now
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelSelect;
