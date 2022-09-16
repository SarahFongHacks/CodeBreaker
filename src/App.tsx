import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBlMEnkyHKOUNZncSmOjXB3v1BEb_HJTY4",
  authDomain: "codebreaker-505ec.firebaseapp.com",
  projectId: "codebreaker-505ec",
  storageBucket: "codebreaker-505ec.appspot.com",
  messagingSenderId: "739772167053",
  appId: "1:739772167053:web:177c6ffcb1cc76f95583c4",
  measurementId: "G-8LRW0DG85C",
};

async function writeToFireBase(db: any) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function App() {
  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  writeToFireBase(db);


/*  const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc) => {
  	console.log(`${doc.id} => ${doc.data()}`);
	});
 */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit<code>src / App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
