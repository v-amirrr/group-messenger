import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAGLqhKynNvGcNv9iJVLe7AakneRvPBYHM",
    authDomain: "group-messenger-a5d6d.firebaseapp.com",
    projectId: "group-messenger-a5d6d",
    storageBucket: "group-messenger-a5d6d.appspot.com",
    messagingSenderId: "316671450117",
    appId: "1:316671450117:web:168fe96fcf5c8b8d5fd06c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };