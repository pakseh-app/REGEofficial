// =====================================
// FORMAT WAKTU
// =====================================

function formatTime(timestamp) {

    if (!timestamp) {

        return "Baru saja";

    }

    if (timestamp.seconds) {

        timestamp = timestamp.seconds * 1000;

    }

    const diff = Date.now() - timestamp;

    const minute = 60000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;

    if (diff < minute) return "Baru saja";
    if (diff < hour) return Math.floor(diff / minute) + " menit lalu";
    if (diff < day) return Math.floor(diff / hour) + " jam lalu";
    if (diff < month) return Math.floor(diff / day) + " hari lalu";
    if (diff < year) return Math.floor(diff / month) + " bulan lalu";

    return Math.floor(diff / year) + " tahun lalu";

}

// =====================================
// POST CARD
// =====================================

export async function PostCard(posts, currentUser) {

    let html = "";

    for (const post of posts) {

        const avatar =
            post.avatar ||
            "assets/default-avatar.png";

        const fullName =
            post.name ||
            "Unknown User";

        const isOwner =
            currentUser?.uid === post.uid;

        const liked =
            post.likedBy?.includes(currentUser?.uid);

        html += `

<div class="post">

    <div class="post-header">

        <div class="post-user">

            <img
                src="${avatar}"
                class="avatar"
                draggable="false">

            <div>

                <h4>${fullName}</h4>

                <small>

                    ${formatTime(post.createdAt || post.time)}

                </small>

            </div>

        </div>

        ${isOwner ? `

        <button
            class="post-menu-btn"
            data-id="${post.id}">

            <i class="fa-solid fa-ellipsis"></i>

        </button>

        ` : ""}

    </div>

    <div class="post-body">

        ${post.caption ? `

        <p class="post-caption">

            ${post.caption}

        </p>

        ` : ""}

        <img
            src="${post.image}"
            class="post-image"
            loading="lazy"
            draggable="false">

    </div>

    <div class="post-footer">

        <div class="post-actions">

            <button
                class="like-btn ${liked ? "liked" : ""}"
                data-id="${post.id}">

                <i class="fa-heart ${liked ? "fa-solid" : "fa-regular"}"></i>

                <span>

                    ${post.likes || 0}

                </span>

            </button>

            <button
                class="comment-btn"
                data-id="${post.id}">

                <i class="fa-regular fa-comment"></i>

                <span>

                    ${post.comments?.length || 0}

                </span>

            </button>

        </div>

    </div>

</div>

`;

    }

    return html;

}