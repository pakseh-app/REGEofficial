import { navigate } from "../router.js";
import { addMember } from "../data/members.js";

export function renderRegister() {

    document.getElementById("app").innerHTML = `

    <div class="login-page">

        <div class="login-card">

            <h1>Daftar Akun</h1>

            <p>Bergabung dengan REGE Official</p>

            <input
    type="text"
    id="fullname"
    placeholder="Nama Lengkap">

<input
    type="text"
    id="username"
    placeholder="Username">

<input
    type="text"
    id="phone"
    placeholder="Nomor HP">

<input
    type="password"
    id="password"
    placeholder="Password">

            <button id="registerBtn">

                Daftar

            </button>

            <p class="register-text">

                Sudah punya akun?

                <span id="loginLink">

                    Masuk

                </span>

            </p>

        </div>

    </div>

    `;

    document
    .getElementById("registerBtn")
    .onclick = () => {

        const fullName =
            document.getElementById("fullname").value.trim();

        const username =
            document.getElementById("username").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value.trim();

        if (
            fullName === "" ||
            username === "" ||
            phone === "" ||
            password === ""
        ) {

            alert("Semua data harus diisi.");

            return;

        }

        addMember({

            id: "RG" + Date.now(),

            fullName,

            username,

            phone,

            password,

            avatar: "assets/default-avatar.png",

            bio: "Selamat datang di REGE Official 🚀",

            jabatan: "Anggota",

            role: "Member",

            hadir: 0,

            tidakHadir: 0,

            terlambat: 0,

            posting: 0,

            approved: true

        });

        alert("Registrasi berhasil.");

        navigate("login");

    };

    document
        .getElementById("loginLink")
        .onclick = () => {

            navigate("login");

        };

}