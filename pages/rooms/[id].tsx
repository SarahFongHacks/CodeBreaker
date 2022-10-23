import React, { useState } from "react";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "..";
import { dbConverter } from "../../db_conversion/db_converter";
import Hotel from "../../components/HotelPage";

const RoomPage = ({ allHotels }) => {
  return <Hotel hotels={allHotels} />;
};

export async function getStaticPaths() {
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

  const paths = allHotels.map((hotel) => ({ params: { id: hotel.id } }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
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

  return {
    props: { allHotels },
  };
}

export default RoomPage;
