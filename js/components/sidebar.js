import { navigate } from "../router.js";
import {
    getCurrentUser,
    clearCurrentUser
} from "../data/currentUser.js";

export function renderSidebar() {

    const sidebarContainer = document.getElementById("sidebar");
    const user = getCurrentUser();

    if (!user) {
        navigate("login");
        return;
    }

    const menus = [
        {
            id: "attendance",
            icon: "fa-solid fa-calendar-check",
            text: "Absensi"
        },
        {
            id: "finance",
            icon: "fa-solid fa-wallet",
            text: "Keuangan"
        }
    ];

    if (
        user.role === "Admin" ||
        user.jabatan === "Ketua"
    ) {
        menus.push({
            id: "announcement",
            icon: "fa-solid fa-bullhorn",
            text: "Pusat Informasi"
        });
    }

    menus.push(
        {
            id: "position",
            icon: "fa-solid fa-user-tie",
            text: "Jabatan"
        },
        {
            id: "setting",
            icon: "fa-solid fa-gear",
            text: "Pengaturan"
        },
        {
            id: "darkmode",
            icon: "fa-solid fa-moon",
            text: "Dark Mode"
        },
        {
            id: "logout",
            icon: "fa-solid fa-right-from-bracket",
            text: "Logout"
        }
    );

    sidebarContainer.innerHTML = `
        <div class="sidebar-overlay"></div>

        <aside class="sidebar">

            <div class="sidebar-header">

                <img
                    src="${user.avatar}"
                    class="sidebar-avatar">

                <h3>${user.fullName}</h3>

                <small>${user.jabatan}</small>

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
    const overlay = sidebarContainer.querySelector(".sidebar-overlay");

    menuButton.addEventListener("click", () => {
        sidebarContainer.classList.add("show");
    });

    overlay.addEventListener("click", () => {
        sidebarContainer.classList.remove("show");
    });

    sidebarContainer.querySelectorAll(".menu-list li").forEach(item => {

        item.addEventListener("click", () => {

            sidebarContainer.classList.remove("show");

            switch (item.dataset.page) {

                case "announcement":
                    navigate("announcement");
                    break;

                case "logout":

                    if (confirm("Yakin ingin logout?")) {

                        clearCurrentUser();

                        localStorage.removeItem("isLogin");

                        navigate("login");

                    }

                    break;

                default:

                    alert("Menu masih dalam pengembangan.");

            }

        });

    });

}