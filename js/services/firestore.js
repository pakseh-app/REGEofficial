import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    getDocs,
    deleteDoc
} from "firebase/firestore";

import { db } from "./firebase.js";

const usersRef = collection(db, "users");

// ==============================
// CREATE USER
// ==============================

export async function addMember(user) {

    if (!user?.uid) {
        throw new Error("UID kosong.");
    }

    await setDoc(
        doc(db, "users", user.uid),
        user
    );

}

// ==============================
// GET USER
// ==============================

export async function getMember(uid) {

    if (!uid) return null;

    const snapshot = await getDoc(
        doc(db, "users", uid)
    );

    if (!snapshot.exists()) {
        return null;
    }

    const data = snapshot.data();

    return {
        id: snapshot.id,
        uid: snapshot.id,
        ...data
    };

}

// ==============================
// GET ALL USERS
// ==============================

export async function getMembers() {

    const snapshot = await getDocs(usersRef);

    return snapshot.docs.map((docSnap) => {

        const data = docSnap.data();

        return {
            id: docSnap.id,
            uid: docSnap.id,
            ...data
        };

    });

}

// ==============================
// UPDATE USER
// ==============================

export async function updateMember(uid, data) {

    if (!uid) {
        throw new Error("UID kosong.");
    }

    await updateDoc(
        doc(db, "users", uid),
        data
    );

}

// ==============================
// DELETE USER
// ==============================

export async function deleteMember(uid) {

    if (!uid) {
        throw new Error("UID kosong.");
    }

    await deleteDoc(
        doc(db, "users", uid)
    );

}