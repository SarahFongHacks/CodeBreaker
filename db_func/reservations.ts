import { collection, doc, setDoc } from "firebase/firestore";

import { dbConverter } from "../db_conversion/db_converter";
import { db } from "../pages/index";
import { FireBaseError, HotelRoom, Reservation, User } from "../types/types";
import { updateUser } from "./user";
import { updateHotelRoom } from "./hotelRoom";
import { FirebaseError } from "firebase/app";

export async function changeReservationDate(
  reservation: Reservation,
  startDate: Date,
  endDate: Date
) {
  reservation.startDate = startDate.getTime();
  reservation.endDate = endDate.getTime();

  await writeReservation(reservation);
}

async function writeReservation(reservation: Reservation) {
  await setDoc(doc(db, "Reservation" ,reservation.id), dbConverter.reservationToJson(reservation));
}

export async function createReservation(
  hotelRoom: HotelRoom,
  user: User,
  startDate: Date,
  endDate: Date

): Promise<FireBaseError> {
  const collectionRef = collection(db, "Reservation");
  const docRef = doc(collectionRef);
  const id = docRef.id;

  const reservation: Reservation = {
    id: id,
    endDate: endDate.getTime(),
    hotelRoomId: hotelRoom.id,
    startDate: startDate.getTime(),
    userId: user.id,
  };

  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: "",
  };

  if (reservation.startDate - reservation.endDate > 0) {
    fireBaseError.error = true;
    fireBaseError.errorMessage = "The checkout date must be after the Check-in date.";
    return fireBaseError;
  }

  for (let res of hotelRoom.reservations) {
      //requested reservation must be fully before or fully after preexisting reservations
      if( reservation.endDate < res.startDate  || reservation.startDate > res.endDate) {}
      else {
        fireBaseError.error = true;
        fireBaseError.errorMessage = "This hotel room is already booked for one or more of these days.";
        return fireBaseError;
      }
  }

  // Is this dumb? yes an I doing it? yes
  try {
    await writeReservation(reservation);
  } catch (error) {
    fireBaseError.error = true;
    fireBaseError.errorCode = error.code;
    fireBaseError.errorMessage = error.message;
  }

  user.currentBooking.push(reservation);
  hotelRoom.reservations.push(reservation);

  // Should I error check these? yes, will i? no
  await updateUser(user);
  await updateHotelRoom(hotelRoom);

       return fireBaseError;
}