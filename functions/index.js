// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//

const {warn} = require("console");
const functions = require("firebase-functions");
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const fetch = require("node-fetch");
const stripe = require("stripe")(
    "sk_test_51LxMk8GjvQ8kI9Vg4nK5grQV5FEuWWVolO1kuVg8NEjC8OsMWmUoBP0LpPSEHwGrSXq0wLOqK5Eex3ZzqeKMGWf700PAvEAQ3J");

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();


async function refund(paymentIntent) {
  await stripe.refunds.create({payment_intent : paymentIntent});
}

async function editResponse(request) {

  const data = request.body.data.object.metadata 

  const reservation = JSON.parse(data.prevBooking)

  await refund(reservation.paymentIntent)

  const newStart = Date.parse(JSON.parse(data.startDate))
  const newEnd = Date.parse(JSON.parse(data.endDate))

  reservation.startDate = newStart;
  reservation.endDate = newEnd;
  reservation.paymentIntent = request.body.data.object.payment_intent

  const docRef = db.collection("Reservation").doc(reservation.id)
  

  docRef.set(reservation) 

}

exports.helloWorld = functions.https.onCall(async (request, response) => {
  const product = await stripe.products.create({
    name : request.productName,
    images : request.images,
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

exports.checkoutComplete =
    functions.https.onRequest(async (request, response) => {
      // console.log(request.body.data.object.metadata)

      //	console.log(request.body)

      const userId = request.body.data.object.metadata.user
      const hotelId = request.body.data.object.metadata.hotel
      const startDate = request.body.data.object.metadata.start
      const endDate = request.body.data.object.metadata.end
      const type = request.body.data.object.metadata.type

      if(type == "edit") {

        await editResponse(request)

      } else if (type == "cancel") {

        const reservation =
            JSON.parse(request.body.data.object.metadata.reservation)

       // console.log(reservation)

        const hotelDocRef =
            db.collection('HotelRoom').doc(reservation.hotelRoomId)
        const userDocRef = db.collection('User').doc(reservation.userId)
        const user = (await userDocRef.get()).data()

        const hotelRoom = (await hotelDocRef.get()).data()

        for (let i = 0; i < hotelRoom.reservations.length; i++) {
          if (hotelRoom.reservations[i].id == reservation.id)
            hotelRoom.reservations.splice(i, 1)
        }

        for (let i = 0; i < user.currentBooking.length; i++) {

					const id = (await user.currentBooking[i].get()).data().id
					
          if (id == reservation.id)
            user.currentBooking.splice(i, 1)
        }

        userDocRef.set(user)
        hotelDocRef.set(hotelRoom)
        const resCollectionRef = db.collection("Reservation");
        const resDocRef = resCollectionRef.doc(reservation.id);

        resDocRef.delete();
      }
      else {

        const userDocRef = db.collection('User').doc(userId)
        const hotelDocRef = db.collection('HotelRoom').doc(hotelId)

        const user = (await userDocRef.get()).data()
        const hotel = (await hotelDocRef.get()).data()

        const resCollectionRef = db.collection("Reservation");
        const resDocRef = resCollectionRef.doc();
        const id = resDocRef.id;
      
        const paymentIntent = request.body.data.object.payment_intent
				const price = request.body.data.object.metadata.price


        const reservation = {
          id : id,
          endDate : Date.parse(endDate),
          hotelRoomId : hotelId,
          startDate : Date.parse(startDate),
          userId : userId,
          paymentIntent : paymentIntent
        }

				user.rewardPoints = user.rewardPoints + Math.trunc((price / 1000));

				console.log(price)
				console.log(user.rewardPoints)


        resDocRef.set(reservation)
        user.currentBooking.push(resDocRef)
        hotel.reservations.push(resDocRef)

        userDocRef.set(user)
        hotelDocRef.set(hotel)
      }

      return response.status(200).end();
    });
