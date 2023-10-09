// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_ugU_cl95xwjhkNY3TS3u2enE_fF1O20",
  authDomain: "deluxe-2deae.firebaseapp.com",
  projectId: "deluxe-2deae",
  storageBucket: "deluxe-2deae.appspot.com",
  messagingSenderId: "78000459869",
  appId: "1:78000459869:web:c107ce914e684a515b3db4",
  measurementId: "G-283XDX7X1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default { firebaseConfig, app, db, analytics }