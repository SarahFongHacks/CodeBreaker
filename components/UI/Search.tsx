import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { BiChevronDown, BiMinus, BiPlus, BiSearchAlt2 } from "react-icons/bi";
import { searchHotel } from "../../db_func/hotelRoom";


const Search = () => {

    const hotelName = () => [
      "LikeHomeHotels",
      "Hilton" ,
    ]
    ;

      
return (
  <div className="w-full grid grid-cols-1 rounded-lg ring-1 ring-black/20 shadow-lg overflow-hidden p-8">
    <p className="font-bold mb-1">Hotel Name</p>
    <div className="w-full flex flex-row space-x-2">
          <input
            className="w-full focus:ring-tertiary text-xl py-3 px-3 ring-1 ring-black/20 focus:outline-none rounded-sm placeholder-black/20"
            placeholder="Enter Hotel Name..."
          ></input>
        </div>
  </div>
);

};

export default Search;