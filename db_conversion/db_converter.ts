import { HotelRoom, Reservation } from "../types/types";
import { DocumentReference, getDoc } from "firebase/firestore";

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
      reservations: reservationsToRefsArray(hotelRoom.reservations),
      capacity: hotelRoom.capacity,
      hotel: hotelRoom.hotel,
      imageURL: hotelRoom.imageURL,
    };
  },

  jsonToReservation(json: any, ref: DocumentReference): Reservation {
    const reservation: Reservation = {
      id: ref.id,
			docRef : ref,
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
};

async function reservationRefsToArray(
  array: DocumentReference[]
): Promise<Reservation[]> {
  const reservations = array.map(async (el) => {
    return dbConverter.jsonToReservation((await getDoc(el)).data(), el);
  });

  return Promise.all(reservations);
}

function reservationsToRefsArray(array : Reservation[]) {
	return array.map(el => el.docRef)
}
