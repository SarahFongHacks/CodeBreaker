const { warn } = require("console");
const functions = require("firebase-functions");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const fetch = require("node-fetch");
const stripe = require("stripe")(
  "sk_test_51LxMk8GjvQ8kI9Vg4nK5grQV5FEuWWVolO1kuVg8NEjC8OsMWmUoBP0LpPSEHwGrSXq0wLOqK5Eex3ZzqeKMGWf700PAvEAQ3J"
);

exports.helloWorld = functions.https.onCall(async (request, response) => {
  console.log(request.images);

  const product = await stripe.products.create({
    name: request.productName,
    images: request.images,
  });

  const price = await stripe.prices.create({
    unit_amount: request.price,
    currency: "usd",
    product: product.id,
  });

  console.log(product);
  console.log(price);

  return product;
});
