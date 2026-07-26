const STORAGE_KEY = "rege_posts";

// Data awal jika localStorage masih kosong
const defaultPosts = [];
// Ambil data dari localStorage

export function loadPosts() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        savePosts(defaultPosts);

        return [...defaultPosts];

    }

    let savedPosts = JSON.parse(data);

    // Hapus postingan dummy (Andi & Rina)
    savedPosts = savedPosts.filter(post =>
        post.isMe === true
    );

    savePosts(savedPosts);

    return savedPosts;

}

// Simpan ke localStorage
export function savePosts(posts) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(posts)
    );

}

// Variabel utama
export let posts = loadPosts();

// Tambah posting
export function addPost(post){

    posts.unshift(post);

    savePosts(posts);

}

// Cari posting
export function getPost(id){

    return posts.find(post => post.id == id);

}