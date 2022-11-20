import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

const BackButton = ({ href }) => {
  return (
    <Link href={href}>
      <div className="h-12 items-center justify-center flex rounded-lg bg-white/70 backdrop-blur-xl ring-1 truncate overflow-hidden py-3 px-5 ring-black/30 transition duration-200 ease-linear hover:ring-black cursor-pointer">
        <BiArrowBack />
      </div>
    </Link>
  );
};

export default BackButton;
