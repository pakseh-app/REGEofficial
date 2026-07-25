import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

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

        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";

    });

    document.getElementById("publishBtn").addEventListener("click", () => {

        const caption = document.getElementById("captionInput").value.trim();

        if (!preview.src || caption === "") {

            alert("Pilih gambar dan isi caption.");

            return;

        }

        alert("Posting berhasil!\n\nPada sprint berikutnya posting akan langsung masuk ke Home Feed.");

    });

}