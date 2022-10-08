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
import { HotelRoom } from "../types/types";

const useHotels = (): HotelRoom[] => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getAllHotels() {
      const docSnap = await getDocs(collection(db, "HotelRoom"));
      const allHotels = [];
      docSnap.forEach((doc) => {
        dbConverter.jsonToHotelRoom(doc.data(), doc.ref).then((res) => {
          allHotels.push(res);
          setHotels(allHotels);
        });
      });
    }
    getAllHotels();
  }, []);

  return hotels;
};

export default useHotels;
