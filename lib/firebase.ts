import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEAyGdO1Xwpw9NmgTZ0_tuNO7d3-Yg4J4",
  authDomain: "jasa-app-53dc7.firebaseapp.com",
  projectId: "jasa-app-53dc7",
  storageBucket: "jasa-app-53dc7.firebasestorage.app",
  messagingSenderId: "457980942373",
  appId: "1:457980942373:web:feb66871017fee410d87cc",
  measurementId: "G-D67YWQEPM7",
  databaseURL: "https://jasa-app-53dc7-default-rtdb.firebaseio.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, database, googleProvider };
