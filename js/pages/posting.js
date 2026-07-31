import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

import { addPost } from "../data/posts.js";
import { updateMember } from "../data/members.js";
import {
    getCurrentUser,
    updateCurrentUser
} from "../data/currentUser.js";

import { uploadImage } from "../services/cloudinary.js";
import { navigate } from "../router.js";

export function renderPosting() {

    const user = getCurrentUser();

    if (!user) {

        navigate("login");
        return;

    }

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
                    placeholder="Apa yang sedang kamu pikirkan?">
                </textarea>

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
    const previewImage = document.getElementById("previewImage");
    const publishBtn = document.getElementById("publishBtn");

    let isPublishing = false;

    // =========================
    // PREVIEW FOTO
    // =========================

    imageInput.addEventListener("change", () => {

        const file = imageInput.files[0];

        if (!file) return;

        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";

    });

    // =========================
    // PUBLISH
    // =========================

    publishBtn.addEventListener("click", async () => {

        if (isPublishing) return;

        const file = imageInput.files[0];

        const caption = document
            .getElementById("captionInput")
            .value
            .trim();

        if (!file) {

            alert("Pilih gambar.");

            return;

        }

        if (!caption) {

            alert("Caption tidak boleh kosong.");

            return;

        }

        try {

            isPublishing = true;

            publishBtn.disabled = true;
            publishBtn.textContent = "Mengupload...";

            const imageUrl = await uploadImage(file);

            publishBtn.textContent = "Menyimpan...";

            await addPost({

                uid: user.uid,

                memberId: user.uid,

                name: user.fullName,

                avatar: user.avatar,

                image: imageUrl,

                caption,

                likes: 0,

                likedBy: [],

                comments: [],

                createdAt: Date.now(),

                isMe: true

            });

            const totalPosting = (user.posting || 0) + 1;

            await updateMember(user.uid, {

                posting: totalPosting

            });

            updateCurrentUser({

                posting: totalPosting

            });

            navigate("home");

        }

        catch (err) {

            console.error(err);

            alert("Gagal membuat postingan.");

            publishBtn.disabled = false;
            publishBtn.textContent = "Publish";

            isPublishing = false;

        }

    });

}