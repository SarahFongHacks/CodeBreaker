import { dbConverter } from "../db_conversion/db_converter";
import { Reservation } from "../types/types";
import { db } from "../pages/index";
import { setDoc } from "firebase/firestore";

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
