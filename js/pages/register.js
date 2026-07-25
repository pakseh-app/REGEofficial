import { navigate } from "../router.js";

export function renderRegister() {

    document.getElementById("app").innerHTML = `

    <div class="login-page">

        <div class="login-card">

            <h1>Daftar Akun</h1>

            <p>Bergabung dengan REGE Official</p>

            <input
                type="text"
                placeholder="Nama Lengkap">

            <input
                type="text"
                placeholder="Username">

            <input
                type="text"
                placeholder="Nomor HP">

            <input
                type="password"
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

            alert("Registrasi berhasil (Dummy)");

            navigate("login");

        };

    document
        .getElementById("loginLink")
        .onclick = () => {

            navigate("login");

        };

}