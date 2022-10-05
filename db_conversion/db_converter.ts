import { HotelRoom, Reservation } from "../types/types";
import { DocumentReference } from "firebase/firestore";

export const dbConverter = {
  jsonToHotelRoom(json: any, ref: DocumentReference): HotelRoom {
    const hotelRoom: HotelRoom = {
      id: ref.id,
      roomNumber: json.roomNumber,
      price: json.price,
      numberOfBeds: json.numberOfBeds,
      numberOfBathrooms: json.numberOfBathrooms,
      reservations: [],
      capacity: json.capacity,
      hotel: json.hotel,
      imageURL: json.imageURL,
    };

    return hotelRoom;
  },

  hotelRoomToJson(hotelRoom: HotelRoom) {
    return {
      id: hotelRoom.id,
      roomNumber: hotelRoom.roomNumber,
      price: hotelRoom.price,
      numberOfBeds: hotelRoom.numberOfBeds,
      numberOfBathrooms: hotelRoom.numberOfBathrooms,
      reservations: hotelRoom.reservations,
      capacity: hotelRoom.capacity,
      hotel: hotelRoom.hotel,
      imageURL: hotelRoom.imageURL,
    };
  },

  jsonToReservation(json: any, ref: DocumentReference): Reservation {
    const reservation: Reservation = {
      id: ref.id,
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
