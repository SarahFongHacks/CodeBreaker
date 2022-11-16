import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const order = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form action="/api/checkout_sessions" method="POST">
        <button
          type="submit"
          className="shadow-md ring-black cursor-pointer ring-1 transition ease-linear duration-200 rounded-md py-3 px-5 flex items-center justify-center"
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default order;
