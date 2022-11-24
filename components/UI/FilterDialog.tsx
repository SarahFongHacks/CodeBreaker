import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiDollar, BiFilter, BiSlider } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { motion } from "framer-motion";

const FilterDialog = ({
  capacity,
  setCapacity,
  beds,
  setBeds,
  baths,
  setBaths,
  priceLower,
  setPriceLower,
  priceUpper,
  setPriceUpper,
  searchHandler,
  setCity,
  setUnitedStates,
}) => {
  const numArray = [1, 2, 3, 4, 5, 6];

  const container = {
    hidden: { y: "-10%", x: "-50%" },
    visible: {
      y: "-50%",
      x: "-50%",
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  const clearHandler = () => {
    setCity("");
    setUnitedStates("");
    setCapacity(0);
    setBeds(0);
    setBaths(0);
    setPriceLower(0);
    setPriceUpper(0);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="justify-center hover:ring-tertiary cursor-pointer flex flex-row space-x-2 items-center w-full text-center focus:ring-tertiary text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-lg placeholder-black/20">
          <BiFilter />
          <p>Filter</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal className="flex h-screen w-full items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content>
          <motion.div
            className="flex flex-col items-center overflow-y-scroll fixed left-1/2 top-1/2 w-8/12 max-w-[54rem] bg-white rounded-lg h-[44rem]"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            <div className="w-full flex flex-row items-center justify-center relative p-6 font-bold text-xl">
              <Dialog.Close className="absolute left-6">
                <GrFormClose />
              </Dialog.Close>
              <p>Filters</p>
            </div>
            <hr className="bg-black w-full" />
            <div className="w-full flex flex-col items-start justify-center p-10 font-bold text-lg">
              <p>Price Range</p>
              <div className="w-full flex flex-row justify-center space-x-6 items-center mt-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="minprice"
                    className="text-base font-medium mb-1"
                  >
                    Min Price
                  </label>
                  <div className="relative">
                    <BiDollar className="absolute left-3 top-4" />
                    <input
                      className=" focus:ring-tertiary appearance-none text-xl py-3 px-3 pl-10 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
                      placeholder="Min Price"
                      value={priceLower}
                      onChange={(e) => setPriceLower(e.target.value)}
                      type="number"
                      id="minprice"
                      min="0"
                    ></input>
                  </div>
                </div>
                <div className="w-2 h-[1px] bg-black mt-6" />
                <div className="flex flex-col">
                  <label className="text-base font-medium mb-1">
                    Max Price
                  </label>
                  <div className="relative">
                    <BiDollar className="absolute left-3 top-4" />
                    <input
                      className=" focus:ring-tertiary appearance-none text-xl py-3 px-3 pl-10 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
                      placeholder="Min Price"
                      value={priceUpper}
                      onChange={(e) => setPriceUpper(e.target.value)}
                      type="number"
                      id="maxprice"
                      min="0"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <hr className="bg-black w-11/12" />
            <div className="w-full flex flex-col items-start justify-center p-10">
              <p className="font-bold text-lg">Capacity</p>
              <div className="w-full flex flex-row space-x-6 mt-6">
                {numArray.map((num) => {
                  return (
                    <div
                      className={`${
                        capacity == num && "bg-tertiary text-white"
                      } cursor-pointer px-6 py-2 rounded-2xl ring-1 ring-black/20`}
                      onClick={() => setCapacity(num)}
                      key={num}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex flex-row justify-center space-x-6 items-center mt-4"></div>
            </div>
            <hr className="bg-black w-11/12" />
            <div className="w-full flex flex-col items-start justify-center p-10">
              <p className="font-bold text-lg">Beds & Baths</p>
              <p className="mt-6">Beds</p>
              <div className="w-full flex flex-row space-x-6 mt-4">
                {numArray.map((num) => {
                  return (
                    <div
                      className={`${
                        beds == num && "bg-tertiary text-white"
                      } cursor-pointer px-6 py-2 rounded-2xl ring-1 ring-black/20`}
                      onClick={() => setBeds(num)}
                      key={num}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4">Baths</p>
              <div className="w-full flex flex-row space-x-6 mt-4">
                {numArray.map((num) => {
                  return (
                    <div
                      className={`${
                        baths == num && "bg-tertiary text-white"
                      } cursor-pointer px-6 py-2 rounded-2xl ring-1 ring-black/20`}
                      onClick={() => setBaths(num)}
                      key={num}
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex flex-row justify-center space-x-6 items-center mt-4"></div>
            </div>
            <hr className="bg-black w-full" />
            <div className=" w-full p-6 flex flex-row items-center justify-between">
              <div
                onClick={() => clearHandler()}
                className="px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] h-full  cursor-pointer bg-black select-none text-white  space-x-2"
              >
                Clear all
              </div>
              <Dialog.Close>
                <div
                  onClick={() => searchHandler()}
                  className="px-4 py-2 rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] h-full  cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white  space-x-2"
                >
                  Search
                </div>
              </Dialog.Close>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FilterDialog;
