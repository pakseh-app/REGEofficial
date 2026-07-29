import { navigate } from "../router.js";

import { auth, db } from "../services/firebase.js";

import {
    createUserWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    setDoc
} from "firebase/firestore";

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

    document
        .getElementById("registerBtn")
        .onclick = async () => {

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

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                const user = userCredential.user;

                await setDoc(
                    doc(db, "users", user.uid),
                    {

                        uid: user.uid,

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

                        approved: true,

                        createdAt: new Date()

                    }
                );

                alert("Registrasi berhasil!");

                navigate("login");

            } catch (error) {

                console.error(error);

                alert(error.message);

            }

        };

    document
        .getElementById("loginLink")
        .onclick = () => {

            navigate("login");

        };

}