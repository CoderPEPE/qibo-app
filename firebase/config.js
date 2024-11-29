import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc2ZlXnFSufncm4p-6cw3aBUprNMleXgI",
  authDomain: "qibo-f4911.firebaseapp.com",
  projectId: "qibo-f4911",
  storageBucket: "qibo-f4911.firebasestorage.app",
  messagingSenderId: "626611718509",
  appId: "1:626611718509:web:c09b3716003d87399e7264",
  measurementId: "G-ZS4SVY0RR6"
};

const FIREBASE_APP = initializeApp(firebaseConfig);

const FIREBASE_AUTH = getAuth(FIREBASE_APP);

let analytics = null;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
});

const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, analytics, FIREBASE_DB };
