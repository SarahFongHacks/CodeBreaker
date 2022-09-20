// Hotel

// User

// Hotel Room

export type HotelRoom = {
	id : string
	roomNumber : number
	price : number 
	numberOfBeds : number  
	numberOfBathrooms : number
	reservations : Reservation[]
	capacity : number
	hotel : string 
}

export type Reservation = {
	readonly id : string;
	readonly userId : string
	readonly startDate : Date
	readonly endDate : Date
	readonly hotelRoomId : string 
}

export type User = {

	name : string
	userId : string
	currentBooking : Reservation[] 	
}

