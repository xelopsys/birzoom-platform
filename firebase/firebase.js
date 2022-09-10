// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


export const firebaseConfig = {
    apiKey: "AIzaSyBGvIFdjTDZN2S6U52y_szaoNGRIEOyYSM",
    authDomain: "xelopsys-a10c8.firebaseapp.com",
    databaseURL: "https://xelopsys-a10c8-default-rtdb.firebaseio.com",
    projectId: "xelopsys-a10c8",
    storageBucket: "xelopsys-a10c8.appspot.com",
    messagingSenderId: "324680525060",
    appId: "1:324680525060:web:8bd3928865f7a156575c51",
    measurementId: "G-H5QTEDPNWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

export const auth = getAuth();