// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6O3YlXRkfBG8YXROvK5U-YkmCdU1-nG8",
  authDomain: "react-cursos-fh-23dd4.firebaseapp.com",
  projectId: "react-cursos-fh-23dd4",
  storageBucket: "react-cursos-fh-23dd4.appspot.com",
  messagingSenderId: "1046675412096",
  appId: "1:1046675412096:web:03ca9b9398c550ec98c265"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );