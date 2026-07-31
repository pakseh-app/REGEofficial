import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { auth } from "./firebase.js";

// ==========================
// LOGIN
// ==========================

export async function login(email, password) {

    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

}

// ==========================
// REGISTER
// ==========================

export async function register(email, password) {

    return await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

}

// ==========================
// LOGOUT
// ==========================

export async function logout() {

    return await signOut(auth);

}

// ==========================
// AUTH STATE
// ==========================

export function listenAuth(callback) {

    return onAuthStateChanged(auth, callback);

}

// ==========================
// CURRENT USER
// ==========================

export function currentUser() {

    return auth.currentUser;

}