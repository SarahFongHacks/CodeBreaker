import React from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
    measurementId: "G-8LRW0DG85C"
};

function App() {

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
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
