const STORAGE_KEY = "rege_events";

// ===================================
// Default Event
// ===================================

const defaultEvents = [

    {

        id: 1,

        title: "Rapat Bulanan",

        description: "Rapat rutin Karang Taruna REGE Official.",

        date: "2026-08-01",

        time: "19:30",

        location: "Balai Desa",

        attendees: []

    }

];

// ===================================
// Load
// ===================================

export function loadEvents() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(defaultEvents)

        );

        return [...defaultEvents];

    }

    return JSON.parse(data);

}

// ===================================
// Variabel utama
// ===================================

export let events = loadEvents();

// ===================================
// Simpan
// ===================================

export function saveEvents() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(events)

    );

}

// ===================================
// Tambah Event
// ===================================

export function addEvent(event) {

    events.unshift(event);

    saveEvents();

}

// ===================================
// Ambil Event
// ===================================

export function getEvent(id) {

    return events.find(

        event => event.id == id

    );

}

// ===================================
// Update Event
// ===================================

export function updateEvent(id, data) {

    const event = getEvent(id);

    if (!event) return;

    Object.assign(

        event,

        data

    );

    saveEvents();

}

// ===================================
// Hapus Event
// ===================================

export function deleteEvent(id) {

    events = events.filter(

        event => event.id != id

    );

    saveEvents();

}