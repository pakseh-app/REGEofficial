export let currentUser = {

    id: "",

    fullName: "",

    username: "",

    phone: "",

    avatar: "assets/default-avatar.png",

    bio: "Selamat datang di REGE Official 🚀",

    jabatan: "Anggota",

    role: "Member",

    hadir: 0,

    tidakHadir: 0,

    terlambat: 0

};

// ===============================
// SET USER AKTIF
// ===============================

export function setCurrentUser(user) {

    currentUser = {

        ...user

    };

}

// ===============================
// SIMPAN
// ===============================

export function saveCurrentUser() {

    localStorage.setItem(

        "currentUser",

        JSON.stringify(currentUser)

    );

}

// ===============================
// LOAD
// ===============================

export function loadCurrentUser() {

    const data = localStorage.getItem("currentUser");

    if (!data) return;

    try {

        currentUser = JSON.parse(data);

    } catch (err) {

        console.error("Gagal membaca currentUser:", err);

        localStorage.removeItem("currentUser");

    }

}

// ===============================
// LOGOUT
// ===============================

export function clearCurrentUser() {

    currentUser = {

        id: "",

        fullName: "",

        username: "",

        phone: "",

        avatar: "assets/default-avatar.png",

        bio: "Selamat datang di REGE Official 🚀",

        jabatan: "Anggota",

        role: "Member",

        hadir: 0,

        tidakHadir: 0,

        terlambat: 0

    };

    localStorage.removeItem("currentUser");

}