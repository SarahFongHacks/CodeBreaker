import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";

import {dbConverter} from "../db_conversion/db_converter";
import {db} from "../pages/index";
import {HotelRoom, SearchFilter} from "../types/types";

export async function updateHotelRoom(hotelRoom: HotelRoom) {
  const docRef = doc(db, "HotelRoom", hotelRoom.id);

  await updateDoc(docRef, await dbConverter.hotelRoomToJson(hotelRoom));
}

export async function getHotelRoom(id: string): Promise<HotelRoom> {

  const docRef = doc(db, "HotelRoom", id);

  return (
      await dbConverter.jsonToHotelRoom((await getDoc(docRef)).data(), docRef));
}

export async function searchHotel(filter: SearchFilter): Promise<HotelRoom[]> {

  const userRef = collection(db, "HotelRoom");
  let q = query(userRef);

  if (filter.enableLocation) {
   
    const city = filter.location.split(",")

    city[0] = city[0].toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    filter.location = city.join(',')

    q = query(q, where("location", "==", filter.location));
  }
  if (filter.enableNumberOfBeds) {
    q = query(q, where("numberOfBeds", "==", filter.numberOfBeds));
  }
  if (filter.enableNumberOfBathrooms) {
    q = query(q, where("numberOfBathrooms", "==", filter.numberOfBathrooms));
  }
  if (filter.enableCapacity) {
    q = query(q, where("capacity", "==", filter.capacity));
  }
  if (filter.enableHotel) {

    filter.hotel = filter.hotel.toLowerCase()
                       .split(' ')
                       .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                       .join(' ');

    q = query(q, where("hotel", "==", filter.hotel));
  }
  if (filter.enablePriceRange) {
    q = query(q, where("price", ">=", filter.priceRangeLower));
    q = query(q, where("price", "<=", filter.priceRangeUpper));
  }

  const snapshot = await getDocs(q);

  const rooms = snapshot.docs.map(async (el) => {
    return await dbConverter.jsonToHotelRoom(el.data(), el.ref);
  });

  console.log(filter);

  return Promise.all(rooms);
}
