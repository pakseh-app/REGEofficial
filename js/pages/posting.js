import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

import { addPost } from "../data/posts.js";

import {
    getCurrentUser,
    updateCurrentUser
} from "../data/currentUser.js";

import {
    updateMember
} from "../data/members.js";

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
                    id="imageInput"
                    type="file"
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

    imageInput.onchange = () => {

        const file = imageInput.files[0];

        if (!file) return;

        preview.src = URL.createObjectURL(file);

        preview.style.display = "block";

    };

    publishBtn.onclick = async () => {

        const file = imageInput.files[0];

        const caption =
            document.getElementById("captionInput").value.trim();

        if (!file) {

            alert("Pilih gambar.");

            return;

        }

        try {

            publishBtn.disabled = true;
            publishBtn.textContent = "Mengupload...";

            const imageUrl = await uploadImage(file);

           await addPost({

    uid: user.uid,

    name: user.fullName,

    avatar: user.avatar,

    caption,

    image: imageUrl

});

            const totalPosting = (user.posting || 0) + 1;

            await updateMember(user.uid, {

                posting: totalPosting

            });

            updateCurrentUser({

                posting: totalPosting

            });

            alert("Posting berhasil.");

            navigate("home");

        }

        catch (err) {

            console.error(err);

            alert("Gagal membuat posting.");

            publishBtn.disabled = false;
            publishBtn.textContent = "Publish";

        }

    };

}