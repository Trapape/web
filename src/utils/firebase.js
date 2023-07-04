import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs-iRGy4GQdnqmLrDqMSV8sIcraM9kXl4",
  authDomain: "trapape.firebaseapp.com",
  databaseURL: "https://trapape-default-rtdb.firebaseio.com",
  projectId: "trapape",
  storageBucket: "trapape.appspot.com",
  messagingSenderId: "716283415470",
  appId: "1:716283415470:web:bb667901c2040e04e3963f",
  measurementId: "G-GBFHDGYF0F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const storage = getStorage(app);

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};
