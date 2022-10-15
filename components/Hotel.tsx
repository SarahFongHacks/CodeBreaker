import React from "react";
import { useRouter } from "next/router";

const Hotel = ({ hotels }) => {
  const router = useRouter();
  console.log(router.pathname);
  const hotel = hotels.find((hotel) => hotel.id === "1");
  return <div>{router.pathname}</div>;
};

export default Hotel;
