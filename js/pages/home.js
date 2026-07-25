import { Navbar } from "../components/navbar.js";
import { StorySection } from "../components/story.js";
import { Announcement } from "../components/announcement.js";
import { PostCard } from "../components/postCard.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { CommentModal } from "../components/commentModal.js";

import { posts, savePosts } from "../data/posts.js";

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

        ${BottomNav()}

        ${CommentModal()}

    </div>

    `;

    renderSidebar();

    // ==========================
    // LIKE
    // ==========================

    document.querySelectorAll(".like-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            const id = Number(btn.dataset.id);

            const post = posts.find(p => p.id === id);

            if (!post) return;

            if (btn.classList.contains("liked")) {

                post.likes--;

                btn.classList.remove("liked");

            } else {

                post.likes++;

                btn.classList.add("liked");

            }

            btn.querySelector("span").textContent = post.likes;

            savePosts(posts);

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

        savePosts(posts);

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

}