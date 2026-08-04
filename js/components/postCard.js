// =====================================
// FORMAT WAKTU
// =====================================

function formatTime(value) {

    if (!value) return "Baru saja";

    let time = value;

    if (typeof value === "object" && value.seconds) {
        time = value.seconds * 1000;
    }

    const diff = Date.now() - time;

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (diff < minute) return "Baru saja";
    if (diff < hour) return `${Math.floor(diff / minute)} menit lalu`;
    if (diff < day) return `${Math.floor(diff / hour)} jam lalu`;
    if (diff < month) return `${Math.floor(diff / day)} hari lalu`;
    if (diff < year) return `${Math.floor(diff / month)} bulan lalu`;

    return `${Math.floor(diff / year)} tahun lalu`;

}

// =====================================
// POST CARD
// =====================================

export async function PostCard(posts, currentUser) {

    let html = "";

    for (const post of posts) {

        const avatar =
            post.avatar && post.avatar !== ""
                ? post.avatar
                : "assets/default-avatar.png";

        const fullName =
            post.name ||
            post.fullName ||
            post.username ||
            "Unknown User";

        const image =
            post.image || "";

        const liked =
            post.likedBy?.includes(currentUser?.uid);

        const isOwner =
            currentUser?.uid === post.uid;

        html += `

<div class="post">

    <div class="post-header">

        <div
            class="post-user"
            data-uid="${post.uid}"
        >

            <img
                class="avatar post-profile-link"
                src="${avatar}"
                alt="${fullName}"
                data-uid="${post.uid}"
                draggable="false"
            >

            <div
                class="post-user-info post-profile-link"
                data-uid="${post.uid}"
            >

                <h4>${fullName}</h4>

                <small>${formatTime(post.createdAt || post.time)}</small>

            </div>

        </div>

        ${
            isOwner
                ? `
        <button
            class="post-menu-btn"
            data-id="${post.id}">

            <i class="fa-solid fa-ellipsis"></i>

        </button>
        `
                : ""
        }

    </div>

    ${
        post.caption
            ? `
        <p class="post-caption">
            ${(post.caption || "").replace(/\n/g, "<br>")}
        </p>
        `
            : ""
    }

    ${
        image
            ? `
        <img
            class="post-image"
            src="${image}"
            alt="Postingan"
            loading="eager"
            fetchpriority="high"
            draggable="false"
        >
        `
            : ""
    }

    <div class="post-footer">

        <button
            class="like-btn ${liked ? "liked" : ""}"
            data-id="${post.id}">

            <i class="${liked ? "fa-solid" : "fa-regular"} fa-heart"></i>

            <span>${post.likes || 0}</span>

        </button>

        <button
            class="comment-btn"
            data-id="${post.id}">

            <i class="fa-regular fa-comment"></i>

            <span>${post.comments?.length || 0}</span>

        </button>

    </div>

</div>

`;

    }

    return html;

}