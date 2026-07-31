import { Navbar } from "../components/navbar.js";
import { StorySection } from "../components/story.js";
import { Announcement } from "../components/announcement.js";
import { BottomNav } from "../components/bottomNav.js";
import { CommentModal } from "../components/commentModal.js";
import { ImagePreview } from "../components/imagePreview.js";
import { PostMenu } from "../components/postMenu.js";
import { EditPostModal } from "../components/editPostModal.js";

import { renderSidebar } from "../components/sidebar.js";
import { PostCard } from "../components/postCard.js";

import {
    getPosts
} from "../data/posts.js";

import {
    getCurrentUser
} from "../data/currentUser.js";

export async function renderHome() {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        location.hash = "#login";

        return;

    }

    const posts = await getPosts();

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        ${StorySection()}

        ${Announcement()}

        <main class="feed">

            ${await PostCard(posts, currentUser)}

        </main>

        ${ImagePreview()}

        ${PostMenu()}

        ${EditPostModal()}

        ${BottomNav()}

        ${CommentModal()}

    </div>

    `;

    renderSidebar();


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
    // LAZY IMAGE
    // =====================================

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const img = entry.target;

                img.src = img.dataset.src || img.src;

                img.onload = () => {

                    img.classList.add("loaded");

                };

                observer.unobserve(img);

            });

        },

        {

            rootMargin: "300px"

        }

    );

    document

        .querySelectorAll(".lazy-image")

        .forEach(img => observer.observe(img));

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

        addComment

    } = await import("../data/posts.js");

    const modal = document.getElementById("commentModal");

    const commentList = document.getElementById("commentList");

    const commentInput = document.getElementById("commentText");

    const sendButton = document.getElementById("sendComment");

    const closeButton = document.getElementById("closeComment");


    document

        .querySelectorAll(".comment-btn")

        .forEach(btn => {

            btn.onclick = async () => {

                selectedPostId = btn.dataset.id;

                const post = await getPost(selectedPostId);

                commentList.innerHTML = "";

                (post.comments || []).forEach(comment => {

                    commentList.innerHTML += `

<div class="comment-item">

<b>${comment.name}</b>

<p>${comment.text}</p>

</div>

`;

                });

                modal.classList.add("show");

                commentInput.focus();

            };

        });

    closeButton.onclick = () => {

        modal.classList.remove("show");

    };

    modal.onclick = e => {

        if (e.target === modal) {

            modal.classList.remove("show");

        }

    };

    sendButton.onclick = async () => {

        if (!selectedPostId) return;

        const text = commentInput.value.trim();

        if (!text) return;

        await addComment(

            selectedPostId,

            {

                uid: currentUser.uid,

                name: currentUser.fullName,

                avatar: currentUser.avatar,

                text,

                time: Date.now()

            }

        );

        commentInput.value = "";

        const latest = await getPost(selectedPostId);

        commentList.innerHTML = "";

        (latest.comments || []).forEach(comment => {

            commentList.innerHTML += `

<div class="comment-item">

<b>${comment.name}</b>

<p>${comment.text}</p>

</div>

`;

        });

        const counter = document.querySelector(

            '.comment-btn[data-id="' +

            selectedPostId +

            '"] span'

        );

        if (counter) {

            counter.textContent =

                latest.comments?.length || 0;

        }

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