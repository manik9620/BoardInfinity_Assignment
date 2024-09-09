// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB96keJTKm94_b9hKsP7VMV0IMzCMreAgc",
  authDomain: "board-infinity-assignment.firebaseapp.com",
  databaseURL: "https://board-infinity-assignment-default-rtdb.firebaseio.com",
  projectId: "board-infinity-assignment",
  storageBucket: "board-infinity-assignment.appspot.com",
  messagingSenderId: "184715694911",
  appId: "1:184715694911:web:3df0bfa937e9a9fd3eb98a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
