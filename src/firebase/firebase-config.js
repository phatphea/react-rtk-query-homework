// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-61AUVBApyosICZz-dOJ49W4pQNp-V4o",
  authDomain: "react-firebase-42ab9.firebaseapp.com",
  projectId: "react-firebase-42ab9",
  storageBucket: "react-firebase-42ab9.firebasestorage.app",
  messagingSenderId: "989324487669",
  appId: "1:989324487669:web:4414ab923458d01ae54ebc",
  measurementId: "G-CB0WDE2LG0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export {auth};