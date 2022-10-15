import { DocumentReference } from "firebase/firestore";

export type HotelRoom = {
  id: string;
  roomNumber: number;
  price: number;
  numberOfBeds: number;
  numberOfBathrooms: number;
  reservations: Reservation[];
  capacity: number;
  hotel: string;
  imageURL: string;
  location: string;
  image : any;
};

export type Reservation = {
  id: string;
  docRef: DocumentReference;
  endDate: number;
  hotelRoomId: string;
  startDate: number;
  userId: string;
};

export type User = {
  id: string;
  email: string;
  currentBooking: Reservation[];
};

export type FireBaseError = {
  error: boolean;
  errorCode: string;
  errorMessage: string;
};

export type UserLoginCred = {
  userCred: any;
  error: FireBaseError;
  user: User;
};
