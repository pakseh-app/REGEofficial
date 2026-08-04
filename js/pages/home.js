import { Navbar } from "../components/navbar.js";
import { StorySection } from "../components/story.js";
import { Announcement } from "../components/announcement.js";
import { BottomNav } from "../components/bottomNav.js";
import { CommentModal } from "../components/commentModal.js";
import { ImagePreview } from "../components/imagePreview.js";
import { PostMenu } from "../components/postMenu.js";
import { EditPostModal } from "../components/editPostModal.js";
import { LikesModal } from "../components/commentLikesModal.js";

import { renderSidebar } from "../components/sidebar.js";
import { PostCard } from "../components/postCard.js";

import {
    getPosts
} from "../data/posts.js";

import {
    getMembers,
    getMember
} from "../data/members.js";

import {
    getCurrentUser
} from "../data/currentUser.js";

// =====================================
// FORMAT WAKTU KOMENTAR
// =====================================

function formatCommentTime(time) {

    if (!time) return "Baru saja";

    const diff = Date.now() - time;

    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (diff < minute) return "Baru saja";

    if (diff < hour)
        return `${Math.floor(diff / minute)} menit lalu`;

    if (diff < day)
        return `${Math.floor(diff / hour)} jam lalu`;

    return `${Math.floor(diff / day)} hari lalu`;

}

export async function renderHome() {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        location.hash = "#login";

        return;

    }

    const posts = await getPosts();

const members = await getMembers();

const finalPosts = posts.map(post => {

    const member = members.find(

        item => item.uid === post.uid

    );

    if (!member) {

        return post;

    }

    return {

        ...post,

        name: member.fullName,

        avatar: member.avatar

    };

});

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        ${StorySection()}

        ${Announcement()}

        <main class="feed">

            ${await PostCard(finalPosts, currentUser)}

        </main>

        ${ImagePreview()}

        ${PostMenu()}

        ${EditPostModal()}

        ${BottomNav("home")}

        ${CommentModal()}
        
        ${LikesModal()}

    </div>

    `;

    renderSidebar();

    document.getElementById("closeLikes").onclick = () => {

    document

        .getElementById("likesModal")

        .classList.remove("show");

};

document.getElementById("likesModal").onclick = e => {

    if (

        e.target.id === "likesModal"

    ) {

        e.target.classList.remove("show");

    }

};

        // =====================================
    // SIDEBAR
    // =====================================

    const menuButton = document.getElementById("menuButton");

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            const sidebar = document.getElementById("sidebar");

            sidebar.classList.add("show");

        });

    }

    

    // =====================================
    // IMAGE PREVIEW
    // =====================================

    const preview = document.getElementById("imagePreview");

    const previewImg = document.getElementById("previewImg");

    const closePreview = document.getElementById("closePreview");

    document

        .querySelectorAll(".post-image")

        .forEach(img => {

            img.onclick = () => {

                preview.classList.add("show");

                previewImg.src = img.src;

            };

        });

    closePreview.onclick = () => {

        preview.classList.remove("show");

    };

    preview.onclick = e => {

        if (e.target === preview) {

            preview.classList.remove("show");

        }

    };

        // =====================================
    // LIKE POST (FIREBASE)
    // =====================================

    const {

        likePost,

        unlikePost,

        getPost

    } = await import("../data/posts.js");

    document

        .querySelectorAll(".like-btn")

        .forEach(btn => {

            let locked = false;

            btn.onclick = async () => {

                if (locked) return;

                locked = true;

                try {

                    const postId = btn.dataset.id;

                    const post = await getPost(postId);

                    if (!post) {

                        locked = false;

                        return;

                    }

                    const liked =

                        post.likedBy?.includes(

                            currentUser.uid

                        );

                    if (liked) {

                        await unlikePost(

                            postId,

                            currentUser.uid

                        );

                    } else {

                        await likePost(

                            postId,

                            currentUser.uid

                        );

                    }

                    const latest = await getPost(postId);

                    btn.classList.toggle(

                        "liked",

                        latest.likedBy?.includes(

                            currentUser.uid

                        )

                    );

                    const icon = btn.querySelector("i");

                    icon.className =

                        latest.likedBy?.includes(

                            currentUser.uid

                        )

                        ? "fa-solid fa-heart"

                        : "fa-regular fa-heart";

                    btn.querySelector("span").textContent =

                        latest.likes || 0;

                } catch (err) {

                    console.error(err);

                }

                locked = false;

            };

        });

   
        // =====================================
// COMMENT
// =====================================

const {

    addComment,

    getComments

} = await import("../data/posts.js");

const modal = document.getElementById("commentModal");

const commentList = document.getElementById("commentList");

const commentInput = document.getElementById("commentText");

const sendButton = document.getElementById("sendComment");

const closeButton = document.getElementById("closeComment");

// =====================================
// RENDER COMMENT
// =====================================

async function renderComments(postId) {

    const comments = await getComments(postId);

    commentList.innerHTML = "";

    for (const comment of comments) {

        const user = members.find(

    item => item.uid === comment.uid

);

        commentList.innerHTML += `

<div class="comment-item">

    <img
        class="comment-avatar"
        src="${user?.avatar || "assets/default-avatar.png"}"
        draggable="false">

    <div class="comment-content">

        <div class="comment-top">

            <b>${user?.fullName || "Pengguna"}</b>

            <span>${formatCommentTime(comment.time)}</span>

        </div>

        <p>${comment.text}</p>

        <div class="comment-actions">

    <div class="comment-like-wrap">

        <button

            class="comment-like-btn ${comment.likedBy?.includes(currentUser.uid) ? "liked" : ""}"

            data-id="${comment.id}"

        >

            ❤️

        </button>

        <span

            class="comment-like-count"

            data-id="${comment.id}"

        >

            ${comment.likes ?? 0}

        </span>

    </div>

    <button

        class="comment-reply-btn"

        data-id="${comment.id}"

    >

        💬 Balas

    </button>

</div>

    </div>

</div>

`;

    }

    await bindCommentLike(postId);

await bindCommentLikeCount(postId);


}

// =====================================
// BIND LIKE COMMENT
// =====================================

async function bindCommentLike(postId) {

    const {

        likeComment,

        unlikeComment

    } = await import("../data/posts.js");

    document

        .querySelectorAll(".comment-like-btn")

        .forEach(btn => {

            btn.onclick = async () => {

                const commentId = btn.dataset.id;

                const comments = await getComments(postId);

                const comment = comments.find(

                    c => c.id === commentId

                );

                if (!comment) return;

                if ((comment.likedBy || []).includes(currentUser.uid)) {

                    await unlikeComment(

                        postId,

                        commentId,

                        currentUser.uid

                    );

                } else {

                    await likeComment(

                        postId,

                        commentId,

                        currentUser.uid

                    );

                }

                await renderComments(postId);

            };

        });

}

// =====================================
// BIND LIKE COMMENT
// =====================================

async function bindCommentLike(postId) {

    const {

        likeComment,

        unlikeComment

    } = await import("../data/posts.js");

    document

        .querySelectorAll(".comment-like-btn")

        .forEach(btn => {

            btn.onclick = async () => {

                const commentId = btn.dataset.id;

                const comments = await getComments(postId);

                const comment = comments.find(

                    c => c.id === commentId

                );

                if (!comment) return;

                if ((comment.likedBy || []).includes(currentUser.uid)) {

                    await unlikeComment(

                        postId,

                        commentId,

                        currentUser.uid

                    );

                } else {

                    await likeComment(

                        postId,

                        commentId,

                        currentUser.uid

                    );

                }

                await renderComments(postId);

            };

        });

}

// =====================================
// BIND LIHAT DAFTAR LIKE
// =====================================

async function bindCommentLikeCount(postId) {

    document

        .querySelectorAll(".comment-like-count")

        .forEach(item => {

            item.onclick = async () => {

                const commentId = item.dataset.id;

                const comments = await getComments(postId);

                const comment = comments.find(

                    c => c.id === commentId

                );

                if (!comment) return;

                const likesModal = document.getElementById("likesModal");

                const likesList = document.getElementById("likesList");

                likesList.innerHTML = "";

                if ((comment.likedBy || []).length === 0) {

                    likesList.innerHTML = `

<p class="empty-likes">

Belum ada yang menyukai komentar ini.

</p>

`;

                } else {

                    for (const uid of comment.likedBy) {

                        const user = members.find(

                            m => m.uid === uid

                        );

                        if (!user) continue;

                        likesList.innerHTML += `

<div class="like-user">

    <img
        src="${user.avatar}"
        draggable="false">

    <b>${user.fullName}</b>

</div>

`;

                    }

                }

                likesModal.classList.add("show");

            };

        });

}

// =====================================
// BUKA KOMENTAR
// =====================================

document
.querySelectorAll(".comment-btn")
.forEach(btn => {

    btn.onclick = async () => {

        selectedPostId = btn.dataset.id;

        await renderComments(selectedPostId);

        modal.classList.add("show");

        commentInput.focus();

    };

});

// =====================================
// TUTUP
// =====================================

closeButton.onclick = () => {

    modal.classList.remove("show");

};

modal.onclick = (e) => {

    if (e.target === modal) {

        modal.classList.remove("show");

    }

};

// =====================================
// KIRIM KOMENTAR
// =====================================

sendButton.onclick = async () => {

    if (!selectedPostId) return;

    const text = commentInput.value.trim();

    if (!text) return;

    // Simpan posisi scroll
    const currentScroll = window.scrollY;

    sendButton.disabled = true;

    sendButton.innerHTML = `

<i class="fa-solid fa-paper-plane"></i>

`;

    const now = Date.now();

const tempComment = {

    id: crypto.randomUUID(),

    uid: currentUser.uid,

    text,

    time: now,

    likes: 0,

    likedBy: [],

    replies: []

};

// tampilkan langsung ke layar
commentList.innerHTML += `

<div class="comment-item">

    <img
        class="comment-avatar"
        src="${currentUser.avatar}"
        draggable="false">

    <div class="comment-content">

        <div class="comment-top">

            <b>${currentUser.fullName}</b>

            <span>Baru saja</span>

        </div>

        <p>${text}</p>

        <div class="comment-actions">

            <button class="comment-like-btn">

                🤍 0

            </button>

            <button class="comment-reply-btn">

                💬 Balas

            </button>

        </div>

    </div>

</div>

`;

commentList.scrollTop = commentList.scrollHeight;

commentInput.value = "";

// upload ke Firebase di background
await addComment(

    selectedPostId,

    tempComment

);

await renderComments(selectedPostId);

    // Update jumlah komentar
    const latest = await getPost(selectedPostId);

    const counter = document.querySelector(

        '.comment-btn[data-id="' +

        selectedPostId +

        '"] span'

    );

    if (counter) {

        counter.textContent = latest.comments?.length || 0;

    }

   // Popup tetap terbuka

commentInput.focus();

// Scroll ke komentar paling bawah
commentList.scrollTo({

    top: commentList.scrollHeight,

    behavior: "smooth"

});

// Kembalikan posisi feed ke postingan tadi
window.scrollTo({

    top: currentScroll,

    behavior: "instant"

});

sendButton.disabled = false;

sendButton.innerHTML = "Kirim";

};

        // =====================================
    // POST MENU
    // =====================================

    const postMenu = document.getElementById("postMenu");

    const closePostMenu = document.getElementById("closePostMenu");

    const deletePostBtn = document.getElementById("deletePostBtn");

    const editPostBtn = document.getElementById("editPostBtn");

    const editModal = document.getElementById("editPostModal");

    const editInput = document.getElementById("editCaptionInput");

    const cancelEdit = document.getElementById("cancelEditPost");

    const saveEdit = document.getElementById("saveEditPost");

    const {

        deletePost,

        updatePost

    } = await import("../data/posts.js");

    let selectedPostId = null;

    document

        .querySelectorAll(".post-menu-btn")

        .forEach(btn => {

            btn.onclick = () => {

                selectedPostId = btn.dataset.id;

                postMenu.classList.add("show");

            };

        });

    closePostMenu.onclick = () => {

        postMenu.classList.remove("show");

    };

    postMenu.onclick = e => {

        if (e.target === postMenu) {

            postMenu.classList.remove("show");

        }

    };

    // ===========================
    // DELETE POST
    // ===========================

    deletePostBtn.onclick = async () => {

        if (!selectedPostId) return;

        if (!confirm("Yakin ingin menghapus postingan ini?")) {

            return;

        }

        await deletePost(selectedPostId);

        postMenu.classList.remove("show");

        renderHome();

    };

    // ===========================
    // EDIT CAPTION
    // ===========================

    editPostBtn.onclick = async () => {

        const post = await getPost(selectedPostId);

        if (!post) return;

        editInput.value = post.caption || "";

        postMenu.classList.remove("show");

        editModal.classList.add("show");

    };

    cancelEdit.onclick = () => {

        editModal.classList.remove("show");

    };

    editModal.onclick = e => {

        if (e.target === editModal) {

            editModal.classList.remove("show");

        }

    };

    saveEdit.onclick = async () => {

        const caption = editInput.value.trim();

        if (!caption) {

            alert("Caption tidak boleh kosong.");

            return;

        }

        await updatePost(

            selectedPostId,

            {

                caption

            }

        );

        editModal.classList.remove("show");

        renderHome();

    };

        // =====================================
    // BOTTOM NAVIGATION
    // =====================================

    const navHome = document.getElementById("nav-home");
    const navSearch = document.getElementById("nav-search");
    const navAdd = document.getElementById("nav-add");
    const navChat = document.getElementById("nav-chat");
    const navProfile = document.getElementById("nav-profile");

    if (navHome) {

        navHome.onclick = () => {

            renderHome();

        };

    }

    if (navSearch) {

        navSearch.onclick = async () => {

            const { navigate } = await import("../router.js");

            navigate("search");

        };

    }

    if (navAdd) {

        navAdd.onclick = async () => {

            const { navigate } = await import("../router.js");

            navigate("posting");

        };

    }

    if (navChat) {

        navChat.onclick = async () => {

            const { navigate } = await import("../router.js");

            navigate("chat");

        };

    }

    if (navProfile) {

        navProfile.onclick = async () => {

            const { navigate } = await import("../router.js");

            navigate("profile");

        };

    };

}