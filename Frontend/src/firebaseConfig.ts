// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALD7e_9jEojdEu2qUIEssNeDEhIIhr16E",
  authDomain: "vitamedllm.firebaseapp.com",
  projectId: "vitamedllm",
  storageBucket: "vitamedllm.firebasestorage.app",
  messagingSenderId: "527843372761",
  appId: "1:527843372761:web:b1fd88ef58410fbbef58c8",
  measurementId: "G-E7PL34GLT9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);