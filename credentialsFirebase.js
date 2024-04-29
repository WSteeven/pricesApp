// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASoxOz-p0Dp_haNpLxXcGg6j9S9jkUV6s",
  authDomain: "pricesappbasic.firebaseapp.com",
  projectId: "pricesappbasic",
  storageBucket: "pricesappbasic.appspot.com",
  messagingSenderId: "621180760967",
  appId: "1:621180760967:web:4e6b6bce19e3144cbfd922",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
