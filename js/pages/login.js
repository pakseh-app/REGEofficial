import { navigate } from "../router.js";

import { login } from "../services/firebaseAuth.js";
import { getMember } from "../services/firestore.js";

import {
    setCurrentUser
} from "../data/currentUser.js";

export function renderLogin() {

    document.getElementById("app").innerHTML = `

    <div class="login-page">

        <div class="login-card">

            <h1>Selamat Datang</h1>

            <p>Masuk ke REGE Official</p>

            <input
                id="email"
                type="email"
                placeholder="Email">

            <input
                id="password"
                type="password"
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

    document.getElementById("loginBtn").onclick = async () => {

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();

        if (!email || !password) {

            alert("Email dan Password wajib diisi.");

            return;

        }

        try {

            const credential = await login(

                email,

                password

            );

            const uid = credential.user.uid;

            const user = await getMember(uid);

            if (!user) {

                alert("Data user tidak ditemukan.");

                return;

            }

            // pastikan id dan uid selalu ada
            user.uid = uid;
            user.id = uid;

            setCurrentUser(user);

            console.log("LOGIN USER =", user);

            navigate("home");

        }

        catch (err) {

            console.error(err);

            switch (err.code) {

                case "auth/user-not-found":

                    alert("Email belum terdaftar.");

                    break;

                case "auth/wrong-password":

                    alert("Password salah.");

                    break;

                case "auth/invalid-email":

                    alert("Format email tidak valid.");

                    break;

                case "auth/invalid-credential":

                    alert("Email atau password salah.");

                    break;

                default:

                    alert(err.message);

            }

        }

    };

    document.getElementById("registerLink").onclick = () => {

        navigate("register");

    };

}