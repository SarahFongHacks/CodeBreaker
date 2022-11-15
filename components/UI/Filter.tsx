import React, { useEffect, useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown, BiMinus, BiPlus, BiSearchAlt2 } from "react-icons/bi";
import FilterDialog from "./FilterDialog";
import { SearchFilter } from "../../types/types";
import { searchHotel } from "../../db_func/hotelRoom";
import useStore from "../../lib/store";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [enableLocation, setEnableLocation] = useState(false);
  const [city, setCity] = useState("");
  const [unitedStates, setUnitedStates] = useState("");
  const [priceLower, setPriceLower] = useState<number>(0);
  const [priceUpper, setPriceUpper] = useState<number>(0);
  const [enablePrice, setEnablePrice] = useState(false);
  const [capacity, setCapacity] = useState<number>(0);
  const [enableCapacity, setEnableCapacity] = useState(false);
  const [beds, setBeds] = useState<number>(0);
  const [enableBeds, setEnableBeds] = useState(false);
  const [baths, setBaths] = useState<number>(0);
  const [enableBaths, setEnableBaths] = useState(false);
  const [hotel, setHotel] = useState("");
  const [enableHotel, setEnableHotel] = useState(false);

  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);
  const searchEnabled = useStore((state) => state.searchEnabled);
  const setSearchEnabled = useStore((state) => state.setSearchEnabled);

  useEffect(() => {
    if (location !== "") {
      setEnableLocation(true);
    } else {
      setEnableLocation(false);
    }
    if (hotel !== "") {
      setEnableHotel(true);
    } else {
      setEnableHotel(false);
    }
    if (capacity !== 0) {
      setEnableCapacity(true);
    } else {
      setEnableCapacity(false);
    }
    if (beds !== 0) {
      setEnableBeds(true);
    } else {
      setEnableBeds(false);
    }
    if (baths !== 0) {
      setEnableBaths(true);
    } else {
      setEnableBaths(false);
    }
    if (priceLower != 0 && priceUpper !== 0) {
      setEnablePrice(true);
    } else {
      setEnablePrice(false);
    }
    if (
      !enableLocation &&
      !enableHotel &&
      !enableCapacity &&
      !enableBeds &&
      !enableBaths &&
      !enablePrice
    ) {
      setSearchEnabled(false);
    }
  }, [location, hotel, capacity, beds, baths, priceLower, priceUpper]);

  useEffect(() => {
    if (!searchEnabled) {
      setCity("");
      setUnitedStates("");
      setHotel("");
      setCapacity(0);
      setBeds(0);
      setBaths(0);
      setPriceLower(0);
      setPriceUpper(0);
    }
  }, [searchEnabled]);

  useEffect(() => {
    console.log(searchEnabled);
    if (city != "" && unitedStates != "") {
      locationHanlder();
    }
  }, [city, unitedStates]);

  useEffect(() => {
    if (hotel != "") {
      hotelHanlder();
    } else {
      setHotel("");
    }
  }, [hotel]);

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
    if (city !== "" && unitedStates !== "") {
      setLocation(city + ", " + unitedStates);
    }
  };

  const hotelHanlder = () => {
    if (hotel !== "") {
      setHotel(hotel);
    }
  };

  async function searchHandler() {
    const filter: SearchFilter = {
      location: location,
      enableLocation: enableLocation,
      numberOfBeds: beds,
      enableNumberOfBeds: enableBeds,
      numberOfBathrooms: baths,
      enableNumberOfBathrooms: enableBaths,
      capacity: capacity,
      enableCapacity: enableCapacity,
      hotel: hotel,
      enableHotel: enableHotel,
      priceRangeLower: priceLower,
      priceRangeUpper: priceUpper,
      enablePriceRange: enablePrice,
    };
    setSearch(await searchHotel(filter));
    setSearchEnabled(true);
  }

  return (
    <div className="bg-white w-full grid grid-cols-5 rounded-lg ring-1 ring-black/20 shadow-lg overflow-hidden gap-8 p-8">
      <div className="w-full flex flex-col space-y-4 items-start justify-center col-span-5">
        <div className="w-full flex-row space-x-2">
          <input
            className="w-full focus:ring-tertiary text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
            placeholder="Enter Hotel Name..."
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="w-full flex flex-col space-y-4 items-start justify-center col-span-3">
        <div className="w-full flex flex-row space-x-2">
          <input
            className="w-full focus:ring-tertiary text-xl py-4 px-4 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
            placeholder="Enter Location..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
                        key={state}
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
        <FilterDialog
          capacity={capacity}
          setCapacity={setCapacity}
          beds={beds}
          setBeds={setBeds}
          baths={baths}
          setBaths={setBaths}
          priceLower={priceLower}
          priceUpper={priceUpper}
          setPriceLower={setPriceLower}
          setPriceUpper={setPriceUpper}
          searchHandler={searchHandler}
          setCity={setCity}
          setUnitedStates={setUnitedStates}
        />
      </div>
      <div
        className="w-full rounded-lg shadow-lg text-lg flex items-center justify-center hover:shadow-xl transition duration-200 ease-linear hover:scale-[1.02] h-full  cursor-pointer bg-gradient-to-r from-tertiary to-[#79A1F7] select-none text-white font-bold space-x-2"
        onClick={() => searchHandler()}
      >
        <BiSearchAlt2 />
        <p className="pr-2">Search</p>
      </div>
    </div>
  );
};

export default Filter;
