// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notfriendzoned-daea3.firebaseapp.com",
  projectId: "notfriendzoned-daea3",
  storageBucket: "notfriendzoned-daea3.appspot.com",
  messagingSenderId: "100341764860",
  appId: "1:100341764860:web:a497a1f9aecee97ee2fd79",
  measurementId: "G-Q622X25XYR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
