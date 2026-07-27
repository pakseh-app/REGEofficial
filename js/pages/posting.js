import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { addPost } from "../data/posts.js";
import { getCurrentMember, updateMember } from "../data/members.js";
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
    const publishBtn = document.getElementById("publishBtn");

    let isPublishing = false;

    // ==========================
    // Preview Gambar
    // ==========================

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            preview.src = e.target.result;
            preview.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

    // ==========================
    // Publish
    // ==========================

    publishBtn.addEventListener("click", () => {

        if (isPublishing) return;

        const user = getCurrentMember();

        if (!user) {

            alert("Silakan login kembali.");

            navigate("login");

            return;

        }

        const caption =
            document.getElementById("captionInput").value.trim();

        if (
            preview.style.display === "none" ||
            caption === ""
        ) {

            alert("Pilih gambar dan isi caption.");

            return;

        }

        isPublishing = true;

        publishBtn.disabled = true;

        publishBtn.textContent = "Memposting...";

        addPost({

            id: Date.now(),

            memberId: user.id,

            name: user.fullName,

            avatar: user.avatar,

            image: preview.src,

            caption: caption,

            time: Date.now(),

            likes: 0,

            likedBy: [],

            comments: [],

            isMe: true

        });

        // Tambah jumlah posting user
        updateMember(user.id, {

            posting: (user.posting || 0) + 1

        });

        // Update currentUser agar ikut sinkron
        user.posting = (user.posting || 0) + 1;

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        // Langsung kembali ke beranda
        navigate("home");

    });

}