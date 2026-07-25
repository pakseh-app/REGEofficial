import { Navbar } from "../components/navbar.js";
import { StorySection } from "../components/story.js";
import { Announcement } from "../components/announcement.js";
import { PostCard } from "../components/postCard.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { CommentModal } from "../components/commentModal.js";

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

    // ===========================
    // LIKE
    // ===========================

    document.querySelectorAll(".like-btn").forEach(btn => {

        btn.onclick = () => {

            const jumlah = btn.querySelector("span");

            let like = parseInt(jumlah.textContent);

            if(btn.classList.contains("liked")){

                like--;

                btn.classList.remove("liked");

            }else{

                like++;

                btn.classList.add("liked");

            }

            jumlah.textContent = like;

        };

    });

    // ===========================
    // KOMENTAR
    // ===========================

    const modal = document.getElementById("commentModal");

    document.querySelectorAll(".comment-btn").forEach(btn=>{

        btn.onclick = ()=>{

            modal.classList.add("show");

            modal.dataset.button = btn.dataset.id;

        };

    });

    document.getElementById("closeComment").onclick = ()=>{

        modal.classList.remove("show");

    };

    document.getElementById("sendComment").onclick = ()=>{

        const input = document.getElementById("commentText");

        const text = input.value.trim();

        if(text==="") return;

        const list = document.getElementById("commentList");

        list.innerHTML += `

            <div class="comment-item">

                <b>Anda</b>

                <p>${text}</p>

            </div>

        `;

        // tambah counter komentar

        const id = modal.dataset.button;

        const tombol = document.querySelector(
            '.comment-btn[data-id="'+id+'"] span'
        );

        tombol.textContent = parseInt(tombol.textContent)+1;

        input.value="";

        list.scrollTop=list.scrollHeight;

    };

}