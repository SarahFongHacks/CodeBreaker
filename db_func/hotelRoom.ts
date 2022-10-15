import {HotelRoom} from "../types/types"
import {db} from "../pages/index"
import {dbConverter} from "../db_conversion/db_converter"
import { doc, setDoc, updateDoc } from "firebase/firestore"; 

export async function updateHotelRoom(hotelRoom : HotelRoom) {

  const docRef = doc(db, 'HotelRoom', hotelRoom.id)

  await updateDoc(docRef, await dbConverter.hotelRoomToJson(hotelRoom)) 
}
