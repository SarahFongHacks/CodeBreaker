import { collection, doc, setDoc } from "firebase/firestore";

import { dbConverter } from "../db_conversion/db_converter";
import { db } from "../pages/index";
import { FireBaseError, HotelRoom, Reservation, User } from "../types/types";

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
  await setDoc(reservation.docRef, dbConverter.reservationToJson(reservation));
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
    docRef: docRef,
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

  writeReservation(reservation).catch((error) => {
    fireBaseError.error = true;
    fireBaseError.errorCode = error.code;
    fireBaseError.errorMessage = error.message;
  });

  return fireBaseError;
}
