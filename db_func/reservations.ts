import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

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

export async function changeReservationRoom(
  user: User,
  reservation: Reservation,
  hotelRoom: HotelRoom,
  startDate: Date,
  endDate: Date
){
  await createReservation(hotelRoom, user, startDate, endDate);
  await deleteDoc(doc(db, "Reservation", reservation.id));
}

async function writeReservation(reservation: Reservation) {
  await setDoc(doc(db, "Reservation" ,reservation.id), dbConverter.reservationToJson(reservation));
}

export async function cancelReservation(reservation: Reservation) {

  const user : User = await dbConverter.jsonToUser(await getDoc(doc(db, "User", reservation.userId)), doc(db, "User", reservation.userId))
  const hotelRoom : HotelRoom = await dbConverter.jsonToHotelRoom(await getDoc(doc(db, "HotelRoom", reservation.hotelRoomId)), doc(db, "HotelRoom", reservation.hotelRoomId))
  
  for(let i = 0; i < hotelRoom.reservations.length; i++) {
    if(hotelRoom.reservations[i].id == reservation.id)
      hotelRoom.reservations.splice(i, 1)
  }
  
  for(let i = 0; i < user.currentBooking.length; i++) {
    if(user.currentBooking[i].id == reservation.id)
      user.currentBooking.splice(i, 1)
  }
 
  updateUser(user)
  updateHotelRoom(hotelRoom)
  await deleteDoc(doc(db, "Reservation", reservation.id));

}

export async function createRewardPointsReservation(
  hotelRoom: HotelRoom,
  user: User,
  startDate: Date,
  endDate: Date,
  requiredPoints: number
): Promise<FireBaseError>{ 

  const fireBaseError: FireBaseError = {
    error: false,
    errorCode: "",
    errorMessage: ""
  };

  const reservation: Reservation = {
    id: user.id,
    endDate: endDate.getTime(),
    hotelRoomId: hotelRoom.id,
    startDate: startDate.getTime(),
    userId: user.id,
    paymentIntent : "RewardPoints"
  };

  if(user.rewardPoints - requiredPoints >= 0){
      user.rewardPoints = user.rewardPoints - requiredPoints;
      try {
          await writeReservation(reservation);
      } catch (error) {
          fireBaseError.error = true;
          fireBaseError.errorCode = error.code;
          fireBaseError.errorMessage = error.message;
    }
  }
  user.currentBooking.push(reservation);
  hotelRoom.reservations.push(reservation);

  await updateUser(user);
  await updateHotelRoom(hotelRoom);
  
  return fireBaseError;
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
    paymentIntent : "RewardPoints",
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

  for (let userRes of user.currentBooking) {
    //resrevation must not conflict with the user's currently-existing bookings
    if( reservation.endDate < userRes.startDate  || reservation.startDate > userRes.endDate) {}
    else {
      fireBaseError.error = true;
      fireBaseError.errorMessage = "You already have a reservation on these days!";
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
