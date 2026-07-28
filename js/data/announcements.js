const STORAGE_KEY = "rege_announcement";

// ===================================
// Default
// ===================================

const defaultAnnouncement = null;

// ===================================
// Load
// ===================================

export function loadAnnouncement() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(defaultAnnouncement)

        );

        return null;

    }

    const announcement = JSON.parse(data);

    // otomatis hilang jika expired

    if (

        announcement &&

        announcement.expiredAt &&

        Date.now() > announcement.expiredAt

    ) {

        clearAnnouncement();

        return null;

    }

    return announcement;

}

// ===================================
// Simpan
// ===================================

export function saveAnnouncement(data) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}

// ===================================
// Hapus
// ===================================

export function clearAnnouncement() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(null)

    );

}

// ===================================
// Ambil
// ===================================

export function getAnnouncement() {

    return loadAnnouncement();

}