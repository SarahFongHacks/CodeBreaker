



// Hotel

// User

// Hotel Room

export type HotelRoom = {
	id : number
	roomNumber : number
	price : number 
	numberOfBeds : number  
	numberOfBathrooms : number
	isReserved : boolean
	reservations : Reservation[]
	capacity : number
	hotel : string 
}

export type Reservation = {
	id : number
	user : User
	startDate : Date
	endDate : Date
	hotelRoom : HotelRoom
}

export type User = {

	name : string
	currentBooking : Reservation[] 	
}

