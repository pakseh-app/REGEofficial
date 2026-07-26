import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { addPost } from "../data/posts.js";
import { currentUser } from "../data/currentUser.js";
import { navigate } from "../router.js";

export function renderPosting() {

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="posting-card">

                <h2>Buat Postingan</h2>

                <input
                    type="file"
                    id="imageInput"
                    accept="image/*">

                <img
                    id="previewImage"
                    class="preview-image"
                    style="display:none;">

                <textarea
                    id="captionInput"
                    placeholder="Apa yang sedang kamu pikirkan?"></textarea>

                <button id="publishBtn">
                    Publish
                </button>

            </div>

        </main>

        ${BottomNav()}

    </div>

    `;

    renderSidebar();

    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("previewImage");

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            preview.src = e.target.result;

            preview.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

    document.getElementById("publishBtn").addEventListener("click", () => {

        const caption =
            document.getElementById("captionInput").value.trim();

        if (!preview.src || caption === "") {

            alert("Pilih gambar dan isi caption.");

            return;

        }

        const avatar =
            localStorage.getItem("profileAvatar") ||
            currentUser.avatar;

        const nama =
            localStorage.getItem("profileName") ||
            currentUser.fullName;

        addPost({

            id: Date.now(),

            name: nama,

            avatar: avatar,

            image: preview.src,

            caption: caption,

            time: Date.now(),

            likes: 0,

            comments: [],

            isMe: true

        });

        navigate("home");

    });

}