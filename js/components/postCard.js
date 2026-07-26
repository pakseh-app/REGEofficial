import { posts } from "../data/posts.js";

// ==========================
// FORMAT WAKTU
// ==========================

function formatTime(timestamp) {

    // Untuk data lama yang masih berupa teks
    if (typeof timestamp !== "number") {

        return timestamp || "Baru saja";

    }

    const selisih = Date.now() - timestamp;

    const menit = Math.floor(selisih / 60000);

    if (menit < 1) return "Baru saja";

    if (menit < 60) return `${menit} menit lalu`;

    const jam = Math.floor(menit / 60);

    if (jam < 24) return `${jam} jam lalu`;

    const hari = Math.floor(jam / 24);

    if (hari < 30) return `${hari} hari lalu`;

    const bulan = Math.floor(hari / 30);

    if (bulan < 12) return `${bulan} bulan lalu`;

    const tahun = Math.floor(bulan / 12);

    return `${tahun} tahun lalu`;

}

export function PostCard() {

    return posts.map(post => {

        // Gunakan avatar & nama terbaru jika posting milik user
        let avatar = post.avatar;
        let name = post.name;

        if (post.isMe) {

            avatar =
                localStorage.getItem("profileAvatar") ||
                avatar;

            name =
                localStorage.getItem("profileName") ||
                name;

        }

        return `

        <div class="post">

            <div class="post-header">

                <img
                    src="${avatar}"
                    class="avatar">

                <div>

                    <h4>${name}</h4>

                    <small>${formatTime(post.time)}</small>

                </div>

            </div>

            <p>${post.caption}</p>

            <img
                src="${post.image}"
                class="post-image">

            <div class="actions">

                <button
                    class="like-btn"
                    data-id="${post.id}">

                    ❤️ <span>${post.likes}</span>

                </button>

                <button
                    class="comment-btn"
                    data-id="${post.id}">

                    💬 <span>${post.comments.length}</span>

                </button>

            </div>

        </div>

        `;

    }).join("");

}