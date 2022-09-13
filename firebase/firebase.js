// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA9j2NyZMEjzrtBTrCI3P-mWppwInBdTq4",
    authDomain: "birzoom-cf74e.firebaseapp.com",
    databaseURL: "https://birzoom-cf74e-default-rtdb.firebaseio.com",
    projectId: "birzoom-cf74e",
    storageBucket: "birzoom-cf74e.appspot.com",
    messagingSenderId: "1003781725914",
    appId: "1:1003781725914:web:21d25b1df269b2760b4fe3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);

export const auth = getAuth();