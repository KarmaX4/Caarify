
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBNr06-xHv4liVC9JfMwPsFQ5T4VzEftdc",
  authDomain: "caarify-de26d.firebaseapp.com",
  databaseURL: "https://caarify-de26d-default-rtdb.firebaseio.com",
  projectId: "caarify-de26d",
  storageBucket: "caarify-de26d.appspot.com",
  messagingSenderId: "556412062342",
  appId: "1:556412062342:web:1ef86157602441c7fa9f07"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);


// const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db

// export const db = getFirestore(app);
// export default firebase.firestore();
