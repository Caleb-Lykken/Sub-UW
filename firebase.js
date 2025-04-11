// firebase-config.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
// OR import { getFirestore } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  databaseURL: "https://your-project-id.firebaseio.com", // Only for Realtime DB
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Or getFirestore(app) for Firestore

export { db };
