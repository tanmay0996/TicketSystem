// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwLgcTZwGTi4Xittd3Svtm8Wmg4fV5Eaw",
  authDomain: "ticket-raiser-b8b92.firebaseapp.com",
  projectId: "ticket-raiser-b8b92",
  storageBucket: "ticket-raiser-b8b92.firebasestorage.app",
  messagingSenderId: "991902627854",
  appId: "1:991902627854:web:a0f675aee7e9c66b96a45f",
  measurementId: "G-50TBX0GQTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);