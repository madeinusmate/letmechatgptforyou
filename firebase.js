// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTRcN9-LykqM8sgf6kPsuWEA2hQpVnodA",
  authDomain: "letmechatgptforyou.firebaseapp.com",
  projectId: "letmechatgptforyou",
  storageBucket: "letmechatgptforyou.appspot.com",
  messagingSenderId: "371009564174",
  appId: "1:371009564174:web:6eb9cdb4288b2c8ad4d65f",
  measurementId: "G-KJ68TLLW3F",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInAnonymously(auth)
  .then(() => {
    console.log("Anonymous authentication successful");
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
  });

export const db = getFirestore(app);
