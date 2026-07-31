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

// =====================================
// COLLECTION
// =====================================

const usersRef = collection(db, "users");

// =====================================
// CREATE USER
// =====================================

export async function addMember(user) {

    if (!user?.uid) {

        throw new Error("UID kosong.");

    }

    const newUser = {

        uid: user.uid,
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",

        avatar: user.avatar || "assets/default-avatar.png",
        bio: user.bio || "Selamat datang di REGE Official 🚀",

        jabatan: user.jabatan || "Anggota",
        role: user.role || "Member",

        posting: user.posting ?? 0,
        followers: user.followers ?? 0,
        following: user.following ?? 0,

        hadir: user.hadir ?? 0,
        tidakHadir: user.tidakHadir ?? 0,
        terlambat: user.terlambat ?? 0,

        approved: user.approved ?? true,

        createdAt: user.createdAt || new Date().toISOString()

    };

    await setDoc(

        doc(db, "users", user.uid),

        newUser

    );

}

// =====================================
// GET USER
// =====================================

export async function getMember(uid) {

    if (!uid) return null;

    const snap = await getDoc(

        doc(db, "users", uid)

    );

    if (!snap.exists()) {

        return null;

    }

    return {

        id: snap.id,
        uid: snap.id,

        ...snap.data()

    };

}

// =====================================
// GET USER BY ID
// =====================================

export async function getMemberById(uid) {

    return await getMember(uid);

}

// =====================================
// GET ALL USERS
// =====================================

export async function getMembers() {

    const snapshot = await getDocs(usersRef);

    return snapshot.docs.map(doc => ({

        id: doc.id,
        uid: doc.id,

        ...doc.data()

    }));

}

// =====================================
// UPDATE USER
// =====================================

export async function updateMember(uid, data) {

    if (!uid) {

        throw new Error("UID kosong.");

    }

    await updateDoc(

        doc(db, "users", uid),

        data

    );

}

// =====================================
// DELETE USER
// =====================================

export async function deleteMember(uid) {

    if (!uid) return;

    await deleteDoc(

        doc(db, "users", uid)

    );

}