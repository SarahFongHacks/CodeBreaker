import { HotelRoom, Reservation, User } from "../types/types";
import { DocumentReference, getDoc, doc} from "firebase/firestore";
import { storage } from "../pages/index";
import { getDownloadURL, listAll } from "firebase/storage";
import { ref } from "firebase/storage";
import {db} from "../pages/index"

export const dbConverter = {
  async jsonToHotelRoom(json: any, ref: DocumentReference): Promise<HotelRoom> {


    console.log(json)
    const hotelRoom: HotelRoom = {
      id: ref.id,
      roomNumber: json.roomNumber,
      price: json.price,
      numberOfBeds: json.numberOfBeds,
      numberOfBathrooms: json.numberOfBathrooms,
      reservations: await reservationRefsToArray(json.reservations),
      capacity: json.capacity,
      hotel: json.hotel,
      imageURL: json.imageURL,
      location: json.location,
    	image: json.image && json.image.length > 0 ? json.image : ["https://firebasestorage.googleapis.com/v0/b/codebreaker-505ec.appspot.com/o/hotel4%2FmainImg.jpeg?alt=media&token=d4c178ec-8dc2-4fa4-899f-be83e1593517"]
		};

    return hotelRoom;
  },

  async hotelRoomToJson(hotelRoom: HotelRoom) {



    return {
      id: hotelRoom.id,
      roomNumber: hotelRoom.roomNumber,
      price: hotelRoom.price,
      numberOfBeds: hotelRoom.numberOfBeds,
      numberOfBathrooms: hotelRoom.numberOfBathrooms,
      reservations: arrayToRefsArray(hotelRoom.reservations),
      capacity: hotelRoom.capacity,
      hotel: hotelRoom.hotel,
      imageURL: hotelRoom.imageURL,
      location: hotelRoom.location,
    };
  },

  jsonToReservation(json: any, ref: DocumentReference): Reservation {


    const reservation: Reservation = {
      id: ref.id,
      endDate: json.endDate,
      hotelRoomId: json.hotelRoomId,
      startDate: json.startDate,
      userId: json.userId,
      paymentIntent : json.paymentIntent,
      rewardPoints : json.rewardPoints ? json.rewardPoints : 100,
    };
    return reservation;
  },

  reservationToJson(reservation: Reservation) {
    return {
      id: reservation.id,
      endDate: reservation.endDate,
      hotelRoomId: reservation.hotelRoomId,
      startDate: reservation.startDate,
      userId: reservation.userId,
      paymentIntent: reservation.paymentIntent,
      rewardPoints : reservation.rewardPoints,
    };
  },

  async jsonToUser(json: any, ref: DocumentReference): Promise<User> {
    const user: User = {
      email: json.email,
      id: ref.id,
      currentBooking: await reservationRefsToArray(json.currentBooking),
      rewardPoints : json.rewardPoints ? json.rewardPoints : 0,
    };
    return user;
  },

  async userToJson(user: User) {
    return {
      email: user.email,
      id: user.id,
      currentBooking: arrayToRefsArray(user.currentBooking),
      rewardPoints : user.rewardPoints,
    };
  },
};

async function reservationRefsToArray(
  refs: DocumentReference[]
): Promise<Reservation[]> {
  const res = refs.map(async (el) => {
    return dbConverter.jsonToReservation((await getDoc(el)).data(), el);
  });

  return Promise.all(res);
}

function arrayToRefsArray(array: any) {

  return array.map((el) => doc(db, "Reservation/" + el.id))
}

async function getHotelRoomImage(imageURL: string): Promise<any> {
  const listRef = ref(storage, imageURL);

  const items = await listAll(listRef);

  const images = [];

  for (let i = 0; i < items.items.length; i++) {
    const image = await getDownloadURL(items.items[i]);

    if (items.items[i].fullPath === imageURL.concat("/mainImg.jpeg")) {
      images.splice(0, 0, image);
    } else {
      images.push(image);
    }
  }

  return Promise.all(images);
}
