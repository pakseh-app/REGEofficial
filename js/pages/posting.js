import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { addPost } from "../data/posts.js";
import { getCurrentMember, updateMember } from "../data/members.js";
import { uploadImage } from "../services/cloudinary.js";
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
    // Preview
    // ==========================

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    });

    // ==========================
    // Publish
    // ==========================

    publishBtn.addEventListener("click", async () => {

        if (isPublishing) return;

        const user = getCurrentMember();

        if (!user) {

            alert("Silakan login kembali.");

            navigate("login");

            return;

        }

        const file = imageInput.files[0];

        const caption = document
            .getElementById("captionInput")
            .value
            .trim();

        if (!file || caption === "") {

            alert("Pilih gambar dan isi caption.");

            return;

        }

        try {

            isPublishing = true;

            publishBtn.disabled = true;

            publishBtn.textContent = "Mengupload...";

            // Upload ke Cloudinary
            const imageUrl = await uploadImage(file);

            publishBtn.textContent = "Menyimpan...";

            addPost({

                id: Date.now(),

                memberId: user.id,

                name: user.fullName,

                avatar: user.avatar,

                image: imageUrl,

                caption: caption,

                time: Date.now(),

                likes: 0,

                likedBy: [],

                comments: [],

                isMe: true

            });

            updateMember(user.id, {

                posting: (user.posting || 0) + 1

            });

            user.posting = (user.posting || 0) + 1;

            localStorage.setItem(

                "currentUser",

                JSON.stringify(user)

            );

            navigate("home");

        } catch (err) {

            console.error(err);

            alert("Upload gambar gagal.");

            publishBtn.disabled = false;

            publishBtn.textContent = "Publish";

            isPublishing = false;

        }

    });

}