// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//

const { warn } = require("console");
const functions = require("firebase-functions");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const fetch = require("node-fetch");
const stripe = require("stripe")(
  "sk_test_51LxMk8GjvQ8kI9Vg4nK5grQV5FEuWWVolO1kuVg8NEjC8OsMWmUoBP0LpPSEHwGrSXq0wLOqK5Eex3ZzqeKMGWf700PAvEAQ3J"
);

exports.helloWorld = functions.https.onCall(async (request, response) => {

  const product = await stripe.products.create({
    name: request.productName,
    images: request.images,
  });

  const price = await stripe.prices.create({
    unit_amount : request.price,
    currency : 'usd',
    product : product.id,
  })

  const ret = {
    product : product,
    price : price,
  }

  return ret;
});

exports.checkoutComplete = functions.https.onRequest((request, response) => {
  
  console.log(request.body)

});
