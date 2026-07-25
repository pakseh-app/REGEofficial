import { navigate } from "../router.js";

const menus = [
    {
        id: "home",
        icon: "fa-solid fa-house",
        text: "Home"
    },
    {
        id: "search",
        icon: "fa-solid fa-magnifying-glass",
        text: "Search"
    },
    {
        id: "posting",
        icon: "fa-solid fa-square-plus",
        text: "Posting"
    },
    {
        id: "chat",
        icon: "fa-solid fa-comments",
        text: "Chat"
    },
    {
        id: "profile",
        icon: "fa-solid fa-user",
        text: "Profile"
    },
    {
        id: "setting",
        icon: "fa-solid fa-gear",
        text: "Pengaturan"
    },
    {
        id: "logout",
        icon: "fa-solid fa-right-from-bracket",
        text: "Logout"
    }
];

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = `

    <div class="sidebar-overlay"></div>

    <aside class="sidebar">

        <div class="sidebar-header">

            <img
                src="https://i.pravatar.cc/150?img=5"
                class="sidebar-avatar"
            >

            <h3>REGE Official</h3>

            <small>@regeofficial</small>

        </div>

        <ul class="menu-list">

            ${menus.map(menu => `

                <li data-page="${menu.id}">

                    <i class="${menu.icon}"></i>

                    <span>${menu.text}</span>

                </li>

            `).join("")}

        </ul>

    </aside>

    `;

    const menuButton = document.getElementById("menuButton");

    const overlay = sidebar.querySelector(".sidebar-overlay");

    menuButton.onclick = () => {

        sidebar.classList.add("show");

    };

    overlay.onclick = () => {

        sidebar.classList.remove("show");

    };

    sidebar.querySelectorAll(".menu-list li").forEach(item => {

        item.onclick = () => {

            sidebar.classList.remove("show");

            navigate(item.dataset.page);

        };

    });

}