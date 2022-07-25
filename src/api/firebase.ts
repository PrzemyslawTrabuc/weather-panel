// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeapIAyAs6romm-jAuE0EeRmQ7DAuwa_U",
  authDomain: "weather-4da7d.firebaseapp.com",
  projectId: "weather-4da7d",
  storageBucket: "weather-4da7d.appspot.com",
  messagingSenderId: "1082434522458",
  appId: "1:1082434522458:web:9b9fb10ab0ceb899127763",
  measurementId: "G-LVZT3NDTJW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export default db;