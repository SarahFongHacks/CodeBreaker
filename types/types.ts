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
  image: any; // First Image is the main bed image
};

export type Reservation = {
  id: string;
  endDate: number;
  hotelRoomId: string;
  startDate: number;
  userId: string;
  paymentIntent: string;
};

export type User = {
  id: string;
  email: string;
  currentBooking: Reservation[];
  rewardPoints : number;
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

export type SearchFilter = {
  location: string;
  enableLocation: boolean;
  numberOfBeds: number;
  enableNumberOfBeds: boolean;
  numberOfBathrooms: number;
  enableNumberOfBathrooms: boolean;
  capacity: number;
  enableCapacity: boolean;
  hotel: string;
  enableHotel: boolean;
  priceRangeLower: number;
  priceRangeUpper: number;
  enablePriceRange: boolean;
};
