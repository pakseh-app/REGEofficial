import { navigate } from "../router.js";

import { auth, db } from "../services/firebase.js";

import { signInWithEmailAndPassword } from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

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

    document
        .getElementById("loginBtn")
        .onclick = async () => {

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            if (!email || !password) {

                alert("Email dan password wajib diisi.");

                return;

            }

            try {

                const userCredential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                const uid = userCredential.user.uid;

                const docRef = doc(db, "users", uid);

                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {

                    alert("Data pengguna tidak ditemukan.");

                    return;

                }

                const user = docSnap.data();

                setCurrentUser(user);

                saveCurrentUser();

                localStorage.setItem("isLogin", "true");

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

                    default:
                        alert("Gagal login.");
                        break;

                }

            }

        };

    document
        .getElementById("registerLink")
        .onclick = () => {

            navigate("register");

        };

}