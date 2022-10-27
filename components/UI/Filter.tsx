import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown } from "react-icons/bi";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [enableLocation, setEnableLocation] = useState(false);
  const [city, setCity] = useState("");
  const [unitedStates, setUnitedStates] = useState("CA");

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
    <div className="w-full grid grid-cols-6 rounded-lg ring-1 ring-black/20 shadow-lg overflow-hidden gap-4 p-8">
      <div className="w-full flex flex-col items-start justify-center col-span-4">
        <p className="font-bold mb-1">Location</p>
        <div className="w-full flex flex-row space-x-4">
          <input
            className="w-3/4 text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
            placeholder="Enter Location..."
          ></input>
          <Select.Root value={unitedStates} onValueChange={setUnitedStates}>
            <Select.Trigger className="p-4 ring-1 ring-black/20 rounded-sm flex flex-row items-center justify-center focus:outline-none ">
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
                        className="w-full p-2 focus:outline-none cursor-pointer items-center flex justify-center hover:bg-tertiary rounded-sm hover:text-white "
                      >
                        <Select.ItemText>{state}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    );
                  })}
                  <Select.Separator />
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
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
