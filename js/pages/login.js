import { navigate } from "../router.js";
import { members } from "../data/members.js";
import {
    setCurrentUser,
    saveCurrentUser
} from "../data/currentUser.js";

export function renderLogin() {

    document.getElementById("app").innerHTML = `

    <div class="login-page">

        <div class="login-card">

            <h1>Selamat Datang</h1>

            <p>Masuk ke REGE Official</p>

            <input
                type="text"
                id="username"
                placeholder="Username / Nomor HP">

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

    // ===============================
    // LOGIN
    // ===============================

    document
        .getElementById("loginBtn")
        .addEventListener("click", () => {

            const username =
                document.getElementById("username").value.trim();

            const password =
                document.getElementById("password").value.trim();

            const user = members.find(member =>

                (
                    member.username === username ||
                    member.phone === username
                ) &&
                member.password === password

            );

            if (!user) {

                alert("Username atau password salah.");

                return;

            }

            // Simpan status login
            localStorage.setItem("isLogin", "true");

            // Simpan user aktif
            setCurrentUser(user);

            saveCurrentUser();

            navigate("home");

        });

    // ===============================
    // REGISTER
    // ===============================

    document
        .getElementById("registerLink")
        .addEventListener("click", () => {

            navigate("register");

        });

}