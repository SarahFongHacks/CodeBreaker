import { HotelRoom, SearchFilter } from "../types/types";
import { db } from "../pages/index";
import { dbConverter } from "../db_conversion/db_converter";
import {
  doc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
	query,
	where,
} from "firebase/firestore";

export async function updateHotelRoom(hotelRoom: HotelRoom) {
  const docRef = doc(db, "HotelRoom", hotelRoom.id);

  await updateDoc(docRef, await dbConverter.hotelRoomToJson(hotelRoom));
}

export async function searchHotel(filter: SearchFilter) : Promise<HotelRoom[]> {
  const userRef = collection(db, "HotelRoom");
  let q = query(userRef);

	if(filter.enableLocation) {
		q = query(q, where("location", "==", filter.location));
	}

	

	const snapshot = await getDocs(q);

	const rooms = snapshot.docs.map(async (el) => {
		return await dbConverter.jsonToHotelRoom(el.data(), el.ref);
	})

	return Promise.all(rooms);
}
	
