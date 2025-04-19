// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6yCGZVQ3u3yhNR_LZtugq7pBKu993mjM",
  authDomain: "netflix-gpt-9a834.firebaseapp.com",
  projectId: "netflix-gpt-9a834",
  storageBucket: "netflix-gpt-9a834.firebasestorage.app",
  messagingSenderId: "47839953211",
  appId: "1:47839953211:web:5a22324d211d3198f2371e",
  measurementId: "G-2X4WL386T0"
};

// Initialize Firebase
const app =initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth();