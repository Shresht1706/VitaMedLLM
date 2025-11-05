import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  connectAuthEmulator,
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

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
const googleProvider = new GoogleAuthProvider();

// Connect to Auth emulator IF running on localhost
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  console.log("Development mode: Connecting to Auth Emulator...");
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

// Export everything we need
export { 
  app, 
  auth, 
  analytics, 
  googleProvider, 
  signInWithPopup, 
  signOut,
};
