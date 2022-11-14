import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const order = () => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form action="/api/checkout_sessions" method="POST">
        <button
          type="submit"
          role="link"
          className="shadow-md ring-black cursor-pointer ring-1 transition ease-linear duration-200 rounded-md py-3 px-5 flex items-center justify-center"
        >
          Checkout
        </button>
      </form>
    </div>
  );
};

export default order;
