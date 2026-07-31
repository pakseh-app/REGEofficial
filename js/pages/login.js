import { navigate } from "../router.js";

import { login } from "../services/firebaseAuth.js";
import { getMember } from "../services/firestore.js";

import { setCurrentUser } from "../data/currentUser.js";

export function renderLogin() {

    document.getElementById("app").innerHTML = `

    <div class="login-page">

        <div class="login-card">

            <h1>Selamat Datang</h1>

            <p>Masuk ke REGE Official</p>

            <input
                type="email"
                id="email"
                placeholder="Email">

            <input
                type="password"
                id="password"
                placeholder="Password">

            <button id="loginBtn">

                Masuk

            </button>

            <p class="register-text">

                Belum punya akun?

                <span id="registerLink">

                    Daftar

                </span>

            </p>

        </div>

    </div>

    `;

    // ==========================
    // LOGIN
    // ==========================

    document.getElementById("loginBtn").onclick = async () => {

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value.trim();

        if (!email || !password) {

            alert("Email dan password wajib diisi.");

            return;

        }

        try {

            // Login Firebase Auth
            const credential = await login(email, password);

            const uid = credential.user.uid;

            // Ambil data user dari Firestore
            const user = await getMember(uid);

            if (!user) {

                alert("Data pengguna tidak ditemukan.");

                return;

            }

            // Pastikan uid & id selalu ada
            user.uid = uid;
            user.id = uid;

            console.log("LOGIN USER =", user);

            // Simpan ke sessionStorage
            setCurrentUser(user);

            navigate("home");

        } catch (error) {

            console.error(error);

            switch (error.code) {

                case "auth/user-not-found":
                    alert("Email belum terdaftar.");
                    break;

                case "auth/wrong-password":
                    alert("Password salah.");
                    break;

                case "auth/invalid-credential":
                    alert("Email atau password salah.");
                    break;

                case "auth/invalid-email":
                    alert("Format email tidak valid.");
                    break;

                case "auth/too-many-requests":
                    alert("Terlalu banyak percobaan login.");
                    break;

                default:
                    alert(error.message);
                    break;

            }

        }

    };

    // ==========================
    // REGISTER
    // ==========================

    document.getElementById("registerLink").onclick = () => {

        navigate("register");

    };

}