import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown, BiMinus, BiPlus, BiSearchAlt2 } from "react-icons/bi";
import FilterDialog from "./FilterDialog";

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
        <FilterDialog />
      </div>
      <div className="w-full rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] h-full  cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white font-bold space-x-2">
        <BiSearchAlt2 />
        <p className="pr-2">Search</p>
      </div>
    </div>
  );
};

export default Filter;
