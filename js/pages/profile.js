import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { updateMember } from "../data/members.js";
import { CropModal } from "../components/cropModal.js";
import { uploadImage } from "../services/cloudinary.js";

import {
    currentUser,
    loadCurrentUser,
    saveCurrentUser
} from "../data/currentUser.js";

export function renderProfile() {

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="profile-card">

                <div class="profile-photo">

                    <img
                        id="profileAvatar"
                        class="profile-avatar"
                        src="https://i.pravatar.cc/200?img=5">

                    <label
                        for="photoInput"
                        class="camera-btn">

                        <i class="fa-solid fa-camera"></i>

                    </label>

                    <input
                        type="file"
                        id="photoInput"
                        accept="image/*"
                        hidden>

                </div>

                <h2 id="profileName">

                    REGE Official

                </h2>

                <p id="profileBio">

                    Selamat datang di REGE Official 🚀

                </p>

                <div class="profile-stats">

                    <div>

                        <h3>12</h3>

                        <small>Posting</small>

                    </div>

                    <div>

                        <h3>1.2K</h3>

                        <small>Followers</small>

                    </div>

                    <div>

                        <h3>530</h3>

                        <small>Following</small>

                    </div>

                </div>

                <button id="editProfile">

                    Edit Nama & Bio

                </button>

            </div>

        </main>

                ${BottomNav()}

        ${CropModal()}

    </div>

    `;

    renderSidebar();
    loadCurrentUser();

// ===============================
// LOAD FOTO PROFIL
// ===============================

const avatar = document.getElementById("profileAvatar");

avatar.src = currentUser.avatar;

// ===============================
// CROPPER
// ===============================

let cropper = null;

const cropModal =
    document.getElementById("cropModal");

const cropImage =
    document.getElementById("cropImage");

const saveCrop =
    document.getElementById("saveCrop");

const cancelCrop =
    document.getElementById("cancelCrop");

// ===============================
// GANTI FOTO
// ===============================

    document
    .getElementById("photoInput")
    .addEventListener("change", function(){

        const file = this.files[0];

        if(!file) return;

        const reader = new FileReader();

        reader.onload = function(e){

            cropModal.classList.add("show");

            cropImage.src = e.target.result;

            if(cropper){

                cropper.destroy();

            }

            cropper = new Cropper(cropImage,{

                aspectRatio:1,

                viewMode:1,

                dragMode:"move",

                autoCropArea:1,

                responsive:true,

                background:false

            });

        };

        reader.readAsDataURL(file);

    });

cancelCrop.onclick = ()=>{

    cropModal.classList.remove("show");

    if(cropper){

        cropper.destroy();

        cropper = null;

    }

};

saveCrop.onclick = async () => {

    if (!cropper) return;

    try {

        saveCrop.disabled = true;

        saveCrop.textContent = "Mengupload...";

        const canvas = cropper.getCroppedCanvas({

            width: 500,

            height: 500

        });

        // Canvas -> Blob
        const blob = await new Promise(resolve =>

            canvas.toBlob(resolve, "image/webp", 0.9)

        );

        // Blob -> File
        const file = new File(

            [blob],

            "avatar.webp",

            {

                type: "image/webp"

            }

        );

        // Upload ke Cloudinary
        const imageUrl = await uploadImage(file);

        // Update tampilan
        avatar.src = imageUrl;

        // Simpan current user
        currentUser.avatar = imageUrl;

        saveCurrentUser();

        // Update member
        updateMember(currentUser.id, {

            avatar: imageUrl

        });

        // Tutup modal
        cropModal.classList.remove("show");

        cropper.destroy();

        cropper = null;

        // Reset tombol
        saveCrop.disabled = false;

        saveCrop.textContent = "Simpan";

        alert("✅ Foto profil berhasil diperbarui.");

    } catch (err) {

        console.error(err);

        alert("Upload avatar gagal.");

        saveCrop.disabled = false;

        saveCrop.textContent = "Simpan";

    }

};

    // ===============================
    // EDIT NAMA
    // ===============================

    document.getElementById("profileName").textContent =
    currentUser.fullName;

    document.getElementById("profileBio").textContent =
    currentUser.bio;

    document
        .getElementById("editProfile")
        .onclick = ()=>{

            const nama = prompt(
                "Nama Baru",
                document.getElementById("profileName").textContent
            );

            if(!nama) return;

            const bio = prompt(
                "Bio Baru",
                document.getElementById("profileBio").textContent
            );

            document.getElementById("profileName").textContent = nama;

            document.getElementById("profileBio").textContent = bio;

            currentUser.fullName = nama;

currentUser.bio = bio;

saveCurrentUser();

updateMember(currentUser.id,{

    fullName:nama,

    bio:bio

});

        };

}