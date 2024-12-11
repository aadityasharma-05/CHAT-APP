// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFQ3KfNLhMQSK68ki5YhjPm6DjkJNAFq8",
  authDomain: "chat-app-706e4.firebaseapp.com",
  projectId: "chat-app-706e4",
  storageBucket: "chat-app-706e4.firebasestorage.app",
  messagingSenderId: "511991168432",
  appId: "1:511991168432:web:cc4f03d423e9ac7686aa75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider() ; 
export const db = getFirestore(app) ;
