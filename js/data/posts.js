const STORAGE_KEY = "rege_posts";

// ===================================
// Default Data
// ===================================

const defaultPosts = [];

// ===================================
// Load
// ===================================

export function loadPosts() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultPosts)
        );

        return [...defaultPosts];

    }

    let savedPosts = JSON.parse(data);

    // Hapus posting dummy lama
    savedPosts = savedPosts.filter(post => post.isMe === true);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(savedPosts)
    );

    return savedPosts;

}

// ===================================
// Variabel utama
// ===================================

export let posts = loadPosts();

// ===================================
// Simpan
// ===================================

export function savePosts() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(posts)

    );

}

// ===================================
// Tambah posting
// ===================================

export function addPost(post) {

    posts.unshift(post);

    savePosts();

}

// ===================================
// Ambil posting
// ===================================

export function getPost(id) {

    return posts.find(post => post.id == id);

}

// ===================================
// Hapus posting
// ===================================

export function deletePost(id) {

    posts = posts.filter(post => post.id != id);

    savePosts();

}