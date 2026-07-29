import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyC9fPzTIQRYevIafr4Z9QYsnJbgkgxt_QM",

    authDomain: "rege-official.firebaseapp.com",

    projectId: "rege-official",

    storageBucket: "rege-official.firebasestorage.app",

    messagingSenderId: "557049679760",

    appId: "1:557049679760:web:c164cce53e9ff74fbe6d15"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);