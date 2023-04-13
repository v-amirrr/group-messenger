import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "group-messenger-a5d6d.firebaseapp.com",
    projectId: "group-messenger-a5d6d",
    storageBucket: "group-messenger-a5d6d.appspot.com",
    messagingSenderId: "316671450117",
    appId: "1:316671450117:web:168fe96fcf5c8b8d5fd06c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };