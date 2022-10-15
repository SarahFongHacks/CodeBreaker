import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MdLocationPin, MdPeopleAlt } from "react-icons/md";
import { IoIosBed } from "react-icons/io";
import { FaMoneyBillWave, FaToilet } from "react-icons/fa";
import { BsFillDoorOpenFill } from "react-icons/bs";

const Hotel = ({ hotels }) => {
  const router = useRouter();
  const id = router.asPath.slice(7);
  const hotel = hotels.find((hotel) => hotel.id === id);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center p-36 ">
      <h1 className="font-bold text-4xl mb-8">{hotel.hotel}</h1>
      <div className="w-full h-full flex flex-row items-start justify-center space-x-8">
        <div className="h-full square rounded-md aspect-square overflow-hidden">
          <img
            src={hotel.image}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col justify-between items-start">
          <div className="w-full grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Location</p>
                <p className="text-base">{hotel.location}</p>
              </div>
              <MdLocationPin className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Capacity</p>
                <p className="text-base">{hotel.capacity} Guests</p>
              </div>
              <MdPeopleAlt className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Bedrooms</p>
                <p className="text-base">{hotel.numberOfBeds} Beds</p>
              </div>
              <IoIosBed className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Bathrooms</p>
                <p className="text-base">{hotel.numberOfBathrooms} Baths</p>
              </div>
              <FaToilet className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Room Number</p>
                <p className="text-base">{hotel.roomNumber}</p>
              </div>
              <BsFillDoorOpenFill className="mx-1" />
            </div>
            <div className="flex flex-row w-full items-center justify-between ring-1 ring-black/20 p-6 rounded-md">
              <div className="flex flex-col ">
                <p className="font-[600]">Rate</p>
                <p className="text-base">${hotel.price / 100}/night</p>
              </div>
              <FaMoneyBillWave className="mx-1" />
            </div>
          </div>
          <div className="w-full shadow-md cursor-pointer ring-tertiary text-white   py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center bg-tertiary hover:bg-white hover:text-tertiary hover:ring-tertiary">
            Book Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
