import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { CropModal } from "../components/cropModal.js";

import { uploadImage } from "../services/cloudinary.js";

import {
    getCurrentUser,
    updateCurrentUser
} from "../data/currentUser.js";
import { updateMember } from "../data/members.js";

import { navigate } from "../router.js";

export function renderProfile() {

    const user = getCurrentUser();

    console.log("PROFILE USER =", user);
    console.log("PROFILE UID =", user.uid);
    console.log("PROFILE ID =", user.id);

    if (!user) {

        navigate("login");

        return;

    }

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
                        src="${user.avatar}">

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

                    ${user.fullName}

                </h2>

                <p id="profileBio">

                    ${user.bio}

                </p>

                <div class="profile-stats">

                    <div>

                        <h3>${user.posting || 0}</h3>

                        <small>Posting</small>

                    </div>

                    <div>

                        <h3>${user.followers || 0}</h3>

                        <small>Followers</small>

                    </div>

                    <div>

                        <h3>${user.following || 0}</h3>

                        <small>Following</small>

                    </div>

                </div>

                <button id="editProfile">

                    Edit Nama & Bio

                </button>

            </div>

        </main>

        ${BottomNav("profile")}

        ${CropModal()}

    </div>

    `;

    renderSidebar();
 
    // ===============================
// FOTO PROFIL
// ===============================

const avatar = document.getElementById("profileAvatar");

avatar.src = user.avatar || "assets/default-avatar.png";

// ===============================
// CROPPER
// ===============================

let cropper = null;

const cropModal = document.getElementById("cropModal");
const cropImage = document.getElementById("cropImage");
const saveCrop = document.getElementById("saveCrop");
const cancelCrop = document.getElementById("cancelCrop");

// ===============================
// PILIH FOTO
// ===============================

document.getElementById("photoInput").addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

        cropModal.classList.add("show");

        cropImage.src = event.target.result;

        if (cropper) {

            cropper.destroy();

        }

        cropper = new Cropper(cropImage, {

            aspectRatio: 1,
            viewMode: 1,
            dragMode: "move",
            autoCropArea: 1,
            responsive: true,
            background: false

        });

    };

    reader.readAsDataURL(file);

});

// ===============================
// BATAL CROP
// ===============================

cancelCrop.onclick = () => {

    cropModal.classList.remove("show");

    if (cropper) {

        cropper.destroy();

        cropper = null;

    }

};

// ===============================
// SIMPAN FOTO
// ===============================

saveCrop.onclick = async () => {

    if (!cropper) return;

    try {

        saveCrop.disabled = true;
        saveCrop.textContent = "Mengupload...";

        const canvas = cropper.getCroppedCanvas({

            width: 500,
            height: 500

        });

        const blob = await new Promise(resolve =>
            canvas.toBlob(resolve, "image/webp", 0.9)
        );

        const file = new File(
            [blob],
            "avatar.webp",
            {
                type: "image/webp"
            }
        );

        const imageUrl = await uploadImage(file);

        // update tampilan
        avatar.src = imageUrl;

        // update object user
        user.avatar = imageUrl;

        // simpan ke sessionStorage
        sessionStorage.setItem(
            "rege_current_user",
            JSON.stringify(user)
        );

        console.log("UPDATE PROFILE =", user);

        // update Firestore
        await updateMember(user.uid, {

            avatar: imageUrl

        });

        cropModal.classList.remove("show");

        cropper.destroy();
        cropper = null;

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
// EDIT NAMA & BIO
// ===============================

document.getElementById("profileName").textContent = user.fullName;

document.getElementById("profileBio").textContent = user.bio || "";

document.getElementById("editProfile").onclick = async () => {

    const nama = prompt(

        "Nama Baru",

        user.fullName

    );

    if (!nama) return;

    const bio = prompt(

        "Bio Baru",

        user.bio || ""

    );

    try {

        // ===========================
        // UPDATE FIRESTORE
        // ===========================

        await updateMember(user.uid, {

            fullName: nama,

            bio: bio || ""

        });

        // ===========================
        // UPDATE DATA LOKAL
        // ===========================

        user.fullName = nama;

        user.bio = bio || "";

        // Simpan kembali ke session
        updateCurrentUser({

            fullName: nama,

            bio: bio || ""

        });

        // ===========================
        // UPDATE TAMPILAN
        // ===========================

        document.getElementById("profileName").textContent = nama;

        document.getElementById("profileBio").textContent = bio || "";

        alert("✅ Profil berhasil diperbarui.");

    } catch (err) {

        console.error(err);

        alert("Gagal memperbarui profil.");

    }

};

// ===============================
// TUTUP renderProfile()
// ===============================

}