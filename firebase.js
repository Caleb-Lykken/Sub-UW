// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJIUGpQCVP5bitsYOSK8zoC_YConvT1gk",
  authDomain: "subuw-d545b.firebaseapp.com",
  projectId: "subuw-d545b",
  storageBucket: "subuw-d545b.firebasestorage.app",
  messagingSenderId: "1058008703382",
  appId: "1:1058008703382:web:ea07cc8f52157dbe3e3db7",
  measurementId: "G-SQV2H8L19Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
