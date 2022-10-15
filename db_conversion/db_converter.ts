import { HotelRoom, Reservation, User } from "../types/types";
import { DocumentReference, getDoc } from "firebase/firestore";
import { storage } from "../pages/index";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

export const dbConverter = {
  async jsonToHotelRoom(json: any, ref: DocumentReference): Promise<HotelRoom> {
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
      image: await getHotelRoomImage(json.imageURL),
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
      docRef: ref,
      endDate: json.endDate,
      hotelRoomId: json.hotelRoomId,
      startDate: json.startDate,
      userId: json.userId,
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
    };
  },

  async jsonToUser(json: any, ref: DocumentReference): Promise<User> {
    const user: User = {
      email: json.email,
      id: ref.id,
      currentBooking: await reservationRefsToArray(json.currentBooking),
    };
    return user;
  },

  async userToJson(user: User) {
    return {
      email: user.email,
      id: user.id,
      currentBooking: arrayToRefsArray(user.currentBooking),
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
  return array.map((el) => el.docRef);
}

async function getHotelRoomImage(imageURL: string) {
  let url;

  try {
    url = await getDownloadURL(ref(storage, imageURL.concat("/mainImg.jpeg")));
  } catch {
    url = await getDownloadURL(ref(storage, "hotel1/mainImg.jpeg"));

    console.log("error");
  }

  return url;
}
