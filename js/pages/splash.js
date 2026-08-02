import { navigate } from "../router.js";
import { getCurrentUser } from "../data/currentUser.js";
import logoRege from "../../assets/logo-rege.png";

export function renderSplash() {

    const user = getCurrentUser();

    const nama = user?.fullName || "Sahabat REGE";

    document.getElementById("app").innerHTML = `

    <div class="splash-screen">

        <div class="bg-blur blur1"></div>

        <div class="bg-blur blur2"></div>

        <div class="logo-wrapper">

            <div class="logo-circle">

                <img
                    src="${logoRege}"
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
                user
                    ? `
                    <p class="welcome-text">

                        Selamat Datang,

                        <b>${nama}</b> 👋

                    </p>
                    `
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

        if (user) {

            console.log("➡️ Splash → Home");

            navigate("home");

        } else {

            console.log("➡️ Splash → Login");

            navigate("login");

        }

    }, 3800);

}