import { navigate } from "../router.js";

import { register } from "../services/firebaseAuth.js";
import { addMember } from "../services/firestore.js";

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
                type="email"
                id="email"
                placeholder="Email">

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

    document.getElementById("registerBtn").onclick = async () => {

        const fullName =
            document.getElementById("fullname").value.trim();

        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const password =
            document.getElementById("password").value.trim();

        if (
            !fullName ||
            !username ||
            !email ||
            !phone ||
            !password
        ) {

            alert("Semua data wajib diisi.");

            return;

        }

        try {

            // ==========================
            // Firebase Authentication
            // ==========================

            const credential = await register(email, password);

            const uid = credential.user.uid;

            // ==========================
            // Firestore
            // ==========================

            const member = {

                uid,
                id: uid,

                fullName,
                username,
                email,
                phone,

                avatar: "assets/default-avatar.png",

                bio: "Selamat datang di REGE Official 🚀",

                jabatan: "Anggota",

                role: "Member",

                hadir: 0,

                tidakHadir: 0,

                terlambat: 0,

                posting: 0,

                followers: 0,

                following: 0,

                approved: true,

                createdAt: new Date().toISOString()

            };

            await addMember(member);

            alert("Registrasi berhasil.");

            navigate("login");

        }

        catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/email-already-in-use":
                    alert("Email sudah digunakan.");
                    break;

                case "auth/weak-password":
                    alert("Password minimal 6 karakter.");
                    break;

                case "auth/invalid-email":
                    alert("Format email tidak valid.");
                    break;

                default:
                    alert(error.message);

            }

        }

    };

    document.getElementById("loginLink").onclick = () => {

        navigate("login");

    };

}