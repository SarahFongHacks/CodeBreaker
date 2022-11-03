import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BiChevronDown,
  BiMinus,
  BiPlus,
  BiSearchAlt2,
  BiSlider,
} from "react-icons/bi";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [enableLocation, setEnableLocation] = useState(false);
  const [city, setCity] = useState("");
  const [unitedStates, setUnitedStates] = useState("CA");
  const [counter, setCounter] = useState(0);

  const maxCounter = 4;

  const incrementHandler = () => {
    if (counter === maxCounter) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  const decrementHandler = () => {
    if (counter === 0) {
      setCounter(maxCounter);
    } else {
      setCounter(counter - 1);
    }
  };

  const states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  const locationHanlder = () => {
    setLocation(city + ", " + unitedStates);
  };

  return (
    <div className="w-full grid grid-cols-5 rounded-lg ring-1 ring-black/20 shadow-lg overflow-hidden gap-8 p-8">
      <div className="w-full flex flex-col items-start justify-center col-span-3">
        <div className="w-full flex flex-row space-x-2">
          <input
            className="w-full focus:ring-tertiary text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
            placeholder="Enter Location..."
          ></input>
          <Select.Root value={unitedStates} onValueChange={setUnitedStates}>
            <Select.Trigger className="p-4  ring-1 ring-black/20 rounded-sm flex flex-row items-center justify-center focus:outline-none ">
              <Select.Value />
              <Select.Icon>
                <BiChevronDown />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="w-full flex flex-col items-center justify-center p-2 overflow-hidden rounded-lg bg-white shadow-xl">
                <Select.ScrollUpButton />
                <Select.Viewport className="w-full">
                  {states.map((state) => {
                    return (
                      <Select.Item
                        value={state}
                        className="w-full p-2  focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                      >
                        <Select.ItemText>{state}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    );
                  })}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      <div className="w-full col-span-1 flex-col flex justify-end ">
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
              <div className="fixed left-1/2 top-1/2 w-11/12 max-w-[64rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg h-[44rem]"></div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* <p className="font-bold mb-1 whitespace-nowrap">Additional filter</p>
        <div className="w-full flex flex-row">
          <Select.Root value={filters} onValueChange={setFilters}>
            <Select.Trigger className="p-4 h-full w-1/2  ring-1 ring-black/20 rounded-sm flex flex-row items-center justify-center focus:outline-none ">
              <Select.Value />
              <Select.Icon>
                <BiChevronDown />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className="w-full flex flex-col items-center justify-center p-2 overflow-hidden rounded-lg bg-white shadow-xl">
                <Select.ScrollUpButton />
                <Select.Viewport className="w-full">
                  <Select.Item
                    value="beds"
                    className="w-full p-2 focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                  >
                    <Select.ItemText>Beds</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                  <Select.Item
                    value="baths"
                    className="w-full p-2 focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                  >
                    <Select.ItemText>Baths</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                  <Select.Item
                    value="capacity"
                    className="w-full p-2 focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                  >
                    <Select.ItemText>Capacity</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                  <Select.Item
                    value="Price"
                    className="w-full p-2 focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                  >
                    <Select.ItemText>Price</Select.ItemText>
                    <Select.ItemIndicator />
                  </Select.Item>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <div className="flex flex-row items-center space-x-4 w-1/2 justify-center h-full">
            <div
              className="w-8 h-8 ring-1 ring-black/20 rounded-full items-center justify-center flex cursor-pointer"
              onClick={() => {
                decrementHandler();
              }}
            >
              <BiMinus />
            </div>
            <p className="text-xl select-none">{counter}</p>
            <div
              className="w-8 h-8 ring-1 ring-black/20 rounded-full items-center justify-center flex cursor-pointer"
              onClick={() => {
                incrementHandler();
              }}
            >
              <BiPlus />
            </div>
          </div>
        </div> */}
      </div>
      <div className="w-full rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] h-full  cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white font-bold space-x-2">
        <BiSearchAlt2 />
        <p className="pr-2">Search</p>
      </div>
    </div>
  );
};

export default Filter;
