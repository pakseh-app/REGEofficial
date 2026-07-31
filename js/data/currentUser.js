// =====================================
// CURRENT USER
// =====================================

const STORAGE_KEY = "rege_current_user";

// =====================================
// SIMPAN USER
// =====================================

export function setCurrentUser(user) {

    if (!user) return;

    sessionStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(user)

    );

}

// =====================================
// AMBIL USER
// =====================================

export function getCurrentUser() {

    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {

        return null;

    }

    try {

        return JSON.parse(data);

    } catch (err) {

        console.error(err);

        sessionStorage.removeItem(STORAGE_KEY);

        return null;

    }

}

// =====================================
// UPDATE USER LOKAL
// =====================================

export function updateCurrentUser(data) {

    const user = getCurrentUser();

    if (!user) return;

    const newUser = {

        ...user,

        ...data

    };

    sessionStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(newUser)

    );

    return newUser;

}

// =====================================
// HAPUS USER
// =====================================

export function clearCurrentUser() {

    sessionStorage.removeItem(STORAGE_KEY);

}

// =====================================
// STATUS LOGIN
// =====================================

export function isLoggedIn() {

    return getCurrentUser() !== null;

}