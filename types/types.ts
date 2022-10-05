// Hotel

// User

// Hotel Room

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
  readonly endDate : number
  readonly hotelRoomId : string 
  readonly startDate : number
  readonly userId : string 
};

export type User = {
  name: string;
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
};
