// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASqC-oq-0HGFaPfsz7-rXHHgDLdiYbfLQ",
  authDomain: "otp-mobileapp.firebaseapp.com",
  projectId: "otp-mobileapp",
  storageBucket: "otp-mobileapp.appspot.com",
  messagingSenderId: "1048267108847",
  appId: "1:1048267108847:web:d2e0779bdb4b9096ff061a",
  measurementId: "G-9QZKTZ73BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);