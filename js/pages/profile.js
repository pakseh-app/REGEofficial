import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

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

    </div>

    `;

    renderSidebar();

    // ===============================
    // LOAD FOTO PROFIL
    // ===============================

    const avatar = document.getElementById("profileAvatar");

    const savedAvatar = localStorage.getItem("profileAvatar");

    if(savedAvatar){

        avatar.src = savedAvatar;

    }

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

                avatar.src = e.target.result;

                localStorage.setItem(
                    "profileAvatar",
                    e.target.result
                );

            };

            reader.readAsDataURL(file);

        });

    // ===============================
    // EDIT NAMA
    // ===============================

    const savedName = localStorage.getItem("profileName");

    if(savedName){

        document.getElementById("profileName").textContent = savedName;

    }

    const savedBio = localStorage.getItem("profileBio");

    if(savedBio){

        document.getElementById("profileBio").textContent = savedBio;

    }

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

            localStorage.setItem(
                "profileName",
                nama
            );

            localStorage.setItem(
                "profileBio",
                bio
            );

        };

}