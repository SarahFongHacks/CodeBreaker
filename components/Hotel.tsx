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
  console.log(hotel);

  return (
    <div className="w-full h-screen flex flex-col items-start justify-center p-36 ">
      <h1 className="font-bold text-4xl mb-8">{hotel.hotel}</h1>
      <div className="w-full h-full flex flex-row items-start justify-center space-x-16">
        <div className="h-full square rounded-lg aspect-square overflow-hidden">
          <img
            src={hotel.image}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
          />
        </div>
        <div className="w-1/2 h-full flex flex-row space-between items-start">
          <div className="w-full h-full grid grid-cols-2 gap-4 text-lg items-start justify-between ">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Location</p>
                <p className="text-base mt-1">{hotel.location}</p>
              </div>
              <MdLocationPin className="mx-4" />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Capacity</p>
                <p className="text-base mt-1">{hotel.capacity} Guests</p>
              </div>
              <MdPeopleAlt className="mx-4" />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Bedrooms</p>
                <p className="text-base mt-1">{hotel.numberOfBeds} beds</p>
              </div>
              <IoIosBed className="mx-4" />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Bathrooms</p>
                <p className="text-base mt-1">
                  {hotel.numberOfBathrooms} baths
                </p>
              </div>
              <FaToilet className="mx-4" />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Room Number</p>
                <p className="text-base mt-1">{hotel.roomNumber}</p>
              </div>
              <BsFillDoorOpenFill className="mx-4" />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
              <div className="flex flex-col">
                <p className="font-semibold">Rate</p>
                <p className="text-base mt-1">${hotel.price}/night</p>
              </div>
              <FaMoneyBillWave className="mx-4" />
            </div>
            <div className="w-full col-span-2 mt-16 place-self-end shadow-md cursor-pointer ring-tertiary text-tertiary  py-3 px-5 ring-1 transition ease-linear duration-200 rounded-md  whitespace-nowrap flex items-center justify-center hover:bg-tertiary hover:text-white hover:ring-tertiary">
              Book Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
