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

const RoomPage = ({ allHotels }) => {
  return <div>Test test</div>;
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

  const docSnap = await getDocs(collection(db, "HotelRoom"));
  docSnap.forEach((doc) => {
    dbConverter.jsonToHotelRoom(doc.data(), doc.ref).then((res) => {
      allHotels.push(res);
    });
  });

  return {
    props: { allHotels },
  };
}

export default RoomPage;
