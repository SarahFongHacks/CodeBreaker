import { useEffect, useState } from "react";
import { dbConverter } from "../db_conversion/db_converter";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../pages";

const useHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getAllHotels() {
      const docSnap = await getDocs(collection(db, "HotelRoom"));
      docSnap.forEach((doc) => {
        dbConverter.jsonToHotelRoom(doc.data(), doc.ref).then((hotel) => {
          dbConverter.hotelRoomToJson(hotel).then((hotel) => {
            setHotels([...hotels, hotel]);
          });
        });
      });
    }
    getAllHotels();
  }, []);

  return hotels;
};

export default useHotels;
