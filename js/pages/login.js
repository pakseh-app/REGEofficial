import { navigate } from "../router.js";

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

    // Tombol Login (sementara langsung ke Home)

    document
        .getElementById("loginBtn")
        .addEventListener("click", () => {

            navigate("home");

        });

    // Link Register

    document
        .getElementById("registerLink")
        .addEventListener("click", () => {

            navigate("register");

        });

}