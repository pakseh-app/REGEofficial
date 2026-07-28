import { posts } from "../data/posts.js";
import {
    getMemberById,
    getCurrentMember
} from "../data/members.js";

// ==========================
// FORMAT WAKTU
// ==========================

function formatTime(timestamp) {

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

// ==========================
// POST CARD
// ==========================

export function PostCard() {

    const currentUser = getCurrentMember();

    return posts.map(post => {

        let avatar = post.avatar;
        let name = post.name;

        // Ambil data member terbaru
        if (post.memberId) {

            const member = getMemberById(post.memberId);

            if (member) {

                avatar = member.avatar;
                name = member.fullName;

            }

        }

        // Kompatibilitas posting lama
        else if (post.isMe && currentUser) {

            avatar = currentUser.avatar;
            name = currentUser.fullName;

        }

        return `

        <div class="post">

            <div class="post-header">

                <img
                    src="${avatar}"
                    class="avatar"
                    loading="lazy"
                    decoding="async"
                    draggable="false">

                <div>

                    <h4>${name}</h4>

                    <small>${formatTime(post.time)}</small>

                </div>

            </div>

            <p>${post.caption}</p>

            <img
    data-src="${post.image}"
    class="post-image lazy-image"
    draggable="false">

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