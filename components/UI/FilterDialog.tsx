import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSlider } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";

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
}) => {
  const numArray = [1, 2, 3, 4, 5, 6];

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="justify-center hover:ring-tertiary cursor-pointer flex flex-row space-x-2 items-center w-full text-center focus:ring-tertiary text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-lg placeholder-black/20">
          <BiSlider />
          <p>Filters</p>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal className="flex h-screen w-full items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/80" />
        <Dialog.Content>
          <div className="flex flex-col items-center overflow-y-scroll fixed left-1/2 top-1/2 w-8/12 max-w-[54rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg h-[44rem]">
            <div className="w-full flex flex-row items-center justify-center relative p-6 font-bold text-xl">
              <Dialog.Close className="absolute left-6">
                <GrFormClose />
              </Dialog.Close>
              <p>Filters</p>
            </div>
            <hr className="bg-black w-11/12" />
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
                  <input
                    className=" focus:ring-tertiary text-xl py-3 px-3 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
                    placeholder="Min Price"
                    value={priceLower}
                    onChange={(e) => setPriceLower(e.target.value)}
                    id="minprice"
                  ></input>
                </div>
                <div className="w-2 h-[1px] bg-black mt-6" />
                <div className="flex flex-col">
                  <label className="text-base font-medium mb-1">
                    Max Price
                  </label>
                  <input
                    className=" focus:ring-tertiary text-xl py-3 px-3 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
                    placeholder="Max Price"
                    value={priceUpper}
                    onChange={(e) => setPriceUpper(e.target.value)}
                    id="maxprice"
                  ></input>
                </div>
              </div>
            </div>
            <hr className="bg-black w-11/12" />
            <div className="w-full flex flex-col items-start justify-center p-10">
              <p className="font-bold text-lg">Capacity</p>
              <p className="mt-6">Capacity</p>
              <div className="w-full flex flex-row space-x-6 mt-4">
                {numArray.map((num) => {
                  return (
                    <div
                      className={`${
                        capacity == num && "bg-tertiary text-white"
                      } cursor-pointer px-6 py-2 rounded-2xl ring-1 ring-black/20`}
                      onClick={() => setCapacity(num)}
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
                    >
                      {num}
                    </div>
                  );
                })}
              </div>
              <div className="w-full flex flex-row justify-center space-x-6 items-center mt-4"></div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FilterDialog;
