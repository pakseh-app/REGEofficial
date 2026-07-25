const STORAGE_KEY = "rege_posts";

// Data awal jika localStorage masih kosong
const defaultPosts = [
    {
        id: 1,
        name: "Andi Saputra",
        avatar: "https://i.pravatar.cc/150?img=5",
        image: "https://picsum.photos/600/400?random=1",
        caption: "Hari ini rapat Karang Taruna jam 19.30 WIB. Jangan lupa hadir ya 🔥",
        time: "5 menit lalu",
        likes: 12,
        comments: [
            {
                name: "Andi",
                text: "Keren 🔥"
            },
            {
                name: "Budi",
                text: "Semangat terus 👍"
            }
        ]
    },
    {
        id: 2,
        name: "Rina",
        avatar: "https://i.pravatar.cc/150?img=10",
        image: "https://picsum.photos/600/400?random=2",
        caption: "Kerja bakti Minggu pagi dimulai jam 07.00 😊",
        time: "20 menit lalu",
        likes: 8,
        comments: []
    }
];

// Ambil data dari localStorage
export function loadPosts() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {

        return JSON.parse(data);

    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultPosts)
    );

    return [...defaultPosts];

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