import { Navbar } from "../components/navbar.js";
import { StorySection } from "../components/story.js";
import { Announcement } from "../components/announcement.js";

import { PostCard } from "../components/postCard.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { CommentModal } from "../components/commentModal.js";
import { ImagePreview } from "../components/imagePreview.js";
import { PostMenu } from "../components/postMenu.js";
import { EditPostModal } from "../components/editPostModal.js";

import { posts, savePosts, deletePost } from "../data/posts.js";
import { getCurrentMember, updateMember } from "../data/members.js";

export function renderHome() {

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        ${StorySection()}

        ${Announcement()}

<main class="feed">

    ${PostCard()}

</main>

        ${ImagePreview()}

        ${PostMenu()}

        ${EditPostModal()}

        ${BottomNav()}

        ${CommentModal()}

    </div>

    `;

    renderSidebar();

   // ==========================
// LAZY LOAD GAMBAR
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const img = entry.target;

        img.src = img.dataset.src;

        img.onload = () => {

            img.classList.add("loaded");

        };

        observer.unobserve(img);

    });

},{

    rootMargin:"300px"

});

document.querySelectorAll(".lazy-image").forEach(img=>{

    observer.observe(img);

});

 // ==========================
// LIKE
// ==========================

const currentUser = getCurrentMember();

document.querySelectorAll(".like-btn").forEach(btn => {

    let likeLocked = false;

    const id = Number(btn.dataset.id);

    const post = posts.find(p => p.id === id);

    if (!post || !currentUser) return;

    if (!post.likedBy) {
        post.likedBy = [];
    }

    if (post.likedBy.includes(currentUser.id)) {
        btn.classList.add("liked");
    }

    btn.querySelector("span").textContent = post.likes;

    btn.addEventListener("click", () => {

        if (likeLocked) return;

        likeLocked = true;

        const currentPost = posts.find(
            p => p.id === id
        );

        if (!currentPost) {

            likeLocked = false;

            return;

        }

        if (!currentPost.likedBy) {
            currentPost.likedBy = [];
        }

        const sudahLike = currentPost.likedBy.includes(
            currentUser.id
        );

        if (sudahLike) {

            currentPost.likedBy = currentPost.likedBy.filter(
                uid => uid !== currentUser.id
            );

            currentPost.likes = Math.max(
                0,
                currentPost.likes - 1
            );

            btn.classList.remove("liked");

        } else {

            currentPost.likedBy.push(currentUser.id);

            currentPost.likes++;

            btn.classList.add("liked");

        }

        btn.querySelector("span").textContent =
            currentPost.likes;

        savePosts();

        setTimeout(() => {

            likeLocked = false;

        }, 150);

    });

});

    // ==========================
    // KOMENTAR
    // ==========================

    const modal = document.getElementById("commentModal");

    const commentList = document.getElementById("commentList");

    const commentInput = document.getElementById("commentText");

    const sendButton = document.getElementById("sendComment");

    const closeButton = document.getElementById("closeComment");

    let currentPost = null;

    document.querySelectorAll(".comment-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = Number(btn.dataset.id);

            currentPost = posts.find(p => p.id === id);

            if (!currentPost) return;

            commentList.innerHTML = "";

            currentPost.comments.forEach(comment => {

                commentList.innerHTML += `

                    <div class="comment-item">

                        <b>${comment.name}</b>

                        <p>${comment.text}</p>

                    </div>

                `;

            });

            modal.classList.add("show");

        });

    });

    closeButton.addEventListener("click", () => {

        modal.classList.remove("show");

    });

    sendButton.addEventListener("click", () => {

        if (!currentPost) return;

        const text = commentInput.value.trim();

        if (text === "") return;

        currentPost.comments.push({

            name: "Anda",

            text: text

        });

        savePosts();

        commentList.innerHTML += `

            <div class="comment-item">

                <b>Anda</b>

                <p>${text}</p>

            </div>

        `;

        const counter = document.querySelector(
            '.comment-btn[data-id="' + currentPost.id + '"]'
        );

        if (counter) {

            counter.innerHTML = `💬 <span>${currentPost.comments.length}</span>`;

        }

        commentInput.value = "";

        commentList.scrollTop = commentList.scrollHeight;

    });

// =========================
// IMAGE PREVIEW
// =========================

const preview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const closePreview = document.getElementById("closePreview");

document.querySelectorAll(".post-image").forEach(img => {

    img.addEventListener("click", () => {

        preview.classList.add("show");

        previewImg.src = img.src;

    });

});

closePreview.addEventListener("click", () => {

    preview.classList.remove("show");

});

preview.addEventListener("click", (e) => {

    if (e.target === preview) {

        preview.classList.remove("show");

    }

});

// =========================
// POST MENU
// =========================

const postMenu = document.getElementById("postMenu");

const closePostMenu = document.getElementById("closePostMenu");

const deletePostBtn = document.getElementById("deletePostBtn");

const editPostBtn = document.getElementById("editPostBtn");

const editPostModal = document.getElementById("editPostModal");

const editCaptionInput = document.getElementById("editCaptionInput");

const cancelEditPost = document.getElementById("cancelEditPost");

const saveEditPost = document.getElementById("saveEditPost");

let selectedPostId = null;

document.querySelectorAll(".post-menu-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        selectedPostId = Number(btn.dataset.id);

        postMenu.classList.add("show");

    });

});

closePostMenu.addEventListener("click", () => {

    postMenu.classList.remove("show");

});

postMenu.addEventListener("click", (e) => {

    if (e.target === postMenu) {

        postMenu.classList.remove("show");

    }

});


// =========================
// DELETE POST
// =========================

deletePostBtn.addEventListener("click", () => {

    if (selectedPostId === null) return;

    const yakin = confirm(
        "Yakin ingin menghapus postingan ini?"
    );

    if (!yakin) return;

    deletePost(selectedPostId);

    if (currentUser) {

        updateMember(currentUser.id, {

            posting: Math.max(
                0,
                (currentUser.posting || 1) - 1
            )

        });

    }

    postMenu.classList.remove("show");

    renderHome();

});

// =========================
// EDIT CAPTION
// =========================

editPostBtn.addEventListener("click", () => {

    const post = posts.find(

        p => p.id === selectedPostId

    );

    if (!post) return;

    editCaptionInput.value = post.caption;

    postMenu.classList.remove("show");

    editPostModal.classList.add("show");

});

cancelEditPost.addEventListener("click", () => {

    editPostModal.classList.remove("show");

});

saveEditPost.addEventListener("click", () => {

    const post = posts.find(

        p => p.id === selectedPostId

    );

    if (!post) return;

    const caption = editCaptionInput.value.trim();

    if (caption === "") {

        alert("Caption tidak boleh kosong.");

        return;

    }

    post.caption = caption;

    savePosts();

    editPostModal.classList.remove("show");

    renderHome();

});

editPostModal.addEventListener("click", (e) => {

    if (e.target === editPostModal) {

        editPostModal.classList.remove("show");

    }

});

}