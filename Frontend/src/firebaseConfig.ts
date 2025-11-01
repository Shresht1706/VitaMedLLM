// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import ALL the auth and functions things we need
import { 
  getAuth, 
  connectAuthEmulator, // Import the emulator connector
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { 
  getFunctions, 
  connectFunctionsEmulator, // Import the emulator connector
  httpsCallable 
} from "firebase/functions";

// Your web app's Firebase configuration
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
const auth = getAuth(app);
const functions = getFunctions(app); // Get the functions service
const googleProvider = new GoogleAuthProvider(); // Create the provider

// --- THIS IS THE CRITICAL FIX ---
// Connect to emulators IF running on localhost
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  console.log("Development mode: Connecting to Firebase Emulators...");
  
  // Point to the Auth emulator
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  
  // Point to the Functions emulator
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
// --- END OF FIX ---

// Export everything we need in our app
export { 
  app, 
  auth, 
  functions, 
  analytics, 
  googleProvider, 
  signInWithPopup, 
  signOut,
  httpsCallable 
};