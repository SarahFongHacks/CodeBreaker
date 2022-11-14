const { warn } = require("console");
const functions = require("firebase-functions");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const fetch = require("node-fetch")

exports.helloWorld = functions.https.onCall((request, response) => {

//console.log(response.);
console.log(request.productName);

fetch("https://api.stripe.com/v1/products", {
  body: "name=" + request.productName,
  headers: {
    Authorization: "Basic c2tfdGVzdF81MUx4TWs4R2p2UThrSTlWZzRuSzVnclFWNUZFdVdXVm9sTzFrdVZnOE5FakM4T3NNV21Vb0JQMExwUFNFSHdHclNYcTB3TE9xSzVFZXgzWnpxZUtNR1dmNzAwUEF2RUFRM0o6",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST"
})

  return "Hello";
});
