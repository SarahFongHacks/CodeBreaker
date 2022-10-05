import { HotelRoom } from "../types/types";

export const dbConverter = {
  jsonToHotelRoom(json: any): HotelRoom {
    const hotelRoom: HotelRoom = {
      id: json.id,
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
};
