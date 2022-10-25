import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/MainPage";

import { signIn, register } from "../auth/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { HotelRoom, Reservation, SearchFilter, User } from "../types/types";
import { dbConverter } from "../db_conversion/db_converter";
import useHotels from "../hooks/useHotels";
import { searchHotel } from "../db_func/hotelRoom";

const firebaseConfig = {
  apiKey: "AIzaSyBlMEnkyHKOUNZncSmOjXB3v1BEb_HJTY4",
  authDomain: "codebreaker-505ec.firebaseapp.com",
  projectId: "codebreaker-505ec",
  storageBucket: "codebreaker-505ec.appspot.com",
  messagingSenderId: "739772167053",
  appId: "1:739772167053:web:177c6ffcb1cc76f95583c4",
  measurementId: "G-8LRW0DG85C",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// async function testing() {
//   const docRef = doc(db, "HotelRoom", "OKj8Mu4bT6oo5paI96jU");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const hotelRoom = await dbConverter.jsonToHotelRoom(docSnap.data(), docRef);
//     console.log(dbConverter.hotelRoomToJson(hotelRoom));
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

const Home: NextPage = () => {
  
	return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <title>Code Breaker's Hotel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </div>
  );
};

export default Home;
