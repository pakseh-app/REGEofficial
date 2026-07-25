import { navigate } from "../router.js";

export function BottomNav() {

    setTimeout(() => {

        document.getElementById("nav-home")?.addEventListener("click", () => {
            navigate("home");
        });

        document.getElementById("nav-search")?.addEventListener("click", () => {
            navigate("search");
        });

        document.getElementById("nav-add")?.addEventListener("click", () => {
            navigate("posting");
        });

        document.getElementById("nav-chat")?.addEventListener("click", () => {
            navigate("chat");
        });

        document.getElementById("nav-profile")?.addEventListener("click", () => {
            navigate("profile");
        });

    }, 0);

    return `

    <nav class="bottom-nav">

        <button id="nav-home">
            <i class="fa-solid fa-house"></i>
        </button>

        <button id="nav-search">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>

        <button id="nav-add" class="add">
            <i class="fa-solid fa-plus"></i>
        </button>

        <button id="nav-chat">
            <i class="fa-regular fa-comment"></i>
        </button>

        <button id="nav-profile">
            <i class="fa-regular fa-user"></i>
        </button>

    </nav>

    `;

}