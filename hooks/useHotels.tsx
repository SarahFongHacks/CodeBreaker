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

const useHotels = (): { data: HotelRoom[]; setData } => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function getAllHotels() {
      let allHotels = [];
      let promises = [];
      const docSnap = await getDocs(collection(db, "HotelRoom"));
      docSnap.forEach((doc) => {
        promises.push(
          dbConverter.jsonToHotelRoom(doc.data(), doc.ref).then((res) => {
            allHotels.push(res);
          })
        );
      });

      await Promise.all(promises);
      setHotels(allHotels);
    }
    getAllHotels();
  }, []);

  return { data: hotels, setData: setHotels };
};

export default useHotels;
