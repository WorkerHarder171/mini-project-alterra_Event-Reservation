// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXgU6fJlIj5rYZq8DfR_jPQJ2f_LFtNrI",
  authDomain: "event-reservation-54522.firebaseapp.com",
  projectId: "event-reservation-54522",
  storageBucket: "event-reservation-54522.appspot.com",
  messagingSenderId: "692763409711",
  appId: "1:692763409711:web:b1d7569169ae4a7432f5da",
  measurementId: "G-RX0K6TYJ0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
