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
};

export type Reservation = {
  readonly id: string;
	readonly docRef: DocumentReference
	readonly endDate : number
  readonly hotelRoomId : string 
  readonly startDate : number
  readonly userId : string 
};

export type User = {
  id : string
	email : string
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
	user : User;
};
