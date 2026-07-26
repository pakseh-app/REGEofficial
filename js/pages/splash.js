import { navigate } from "../router.js";

export function renderSplash() {

    const nama =
        localStorage.getItem("profileName") || "Sahabat REGE";

    const isLogin =
        localStorage.getItem("isLogin");

    document.getElementById("app").innerHTML = `

    <div class="splash-screen">

        <div class="bg-blur blur1"></div>
        <div class="bg-blur blur2"></div>

        <div class="logo-wrapper">

            <div class="logo-circle">

    <img
        src="assets/logo-rege.png"
        class="logo-image"
        alt="REGE Official">

</div>

            <h1 class="logo-title">

                REGE Official

            </h1>

            <p class="logo-subtitle">

                Komunitas Digital Karang Taruna

            </p>

            ${
                isLogin === "true"
                    ? `<p class="welcome-text">
                        Selamat Datang,
                        <b>${nama}</b> 👋
                    </p>`
                    : ""
            }

            <div class="loading">

                <span></span>
                <span></span>
                <span></span>

            </div>

            <p class="loading-text">

                Memuat komunitas...

            </p>

        </div>

    </div>

    `;

    setTimeout(() => {

        if (isLogin === "true") {

            navigate("home");

        } else {

            navigate("login");

        }

    }, 2500);

}