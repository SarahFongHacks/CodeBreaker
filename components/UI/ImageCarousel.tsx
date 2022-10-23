import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const ImageCarousel = ({ images }) => {
  const [counter, setCounter] = useState(0);

  const incrementHandler = () => {
    if (counter === images.length - 1) {
      setCounter(0);
    } else {
      setCounter(counter + 1);
    }
  };

  const decrementHandler = () => {
    if (counter === 0) {
      setCounter(images.length - 1);
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="h-[32rem] w-[32rem] square rounded-md aspect-square overflow-hidden relative bg-black/50">
      <AnimatePresence exitBeforeEnter>
        {images && (
          <motion.img
            key={counter + 2}
            src={images[counter]}
            className="w-full select-none h-full object-cover group-hover:scale-110 transition duration-200 ease-linear"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <div
        className="bg-white/50 hover:bg-white transition duration-200 ease-linear ring-1  ring-black/50 flex text-xl items-center justify-center rounded-full w-12 h-12 absolute right-4 top-[45%] z-10 cursor-pointer"
        onClick={() => incrementHandler()}
      >
        <BsArrowRightShort />
      </div>
      <div
        className="bg-white/50 hover:bg-white transition duration-200 ease-linear ring-1  ring-black/50 flex text-xl items-center justify-center rounded-full w-12 h-12 absolute left-4 top-[45%] z-10 cursor-pointer"
        onClick={() => decrementHandler()}
      >
        <BsArrowLeftShort />
      </div>
    </div>
  );
};

export default ImageCarousel;
