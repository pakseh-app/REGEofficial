import { navigate } from "../router.js";

export function renderSplash() {

    document.getElementById("app").innerHTML = `

    <div class="splash-screen">

        <div class="logo-wrapper">

            <div class="logo-circle">

                <i class="fa-solid fa-users"></i>

            </div>

            <h1 class="logo-title">
                REGE Official
            </h1>

            <p class="logo-subtitle">
                Komunitas Digital Karang Taruna
            </p>

        </div>

    </div>

    `;

    setTimeout(() => {

        navigate("login");

    },2500);

}