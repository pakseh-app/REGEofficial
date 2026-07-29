import { navigate } from "../router.js";
import { getCurrentMember } from "../data/members.js";

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    const user = getCurrentMember();

    if (!user) {

        navigate("login");

        return;

    }

    // =====================================
    // MENU
    // =====================================

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

    // Menu khusus Admin / Ketua
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

    // Menu umum
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

    // =====================================
    // RENDER
    // =====================================

    sidebar.innerHTML = `

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

    // =====================================
    // OPEN / CLOSE
    // =====================================

    const menuButton = document.getElementById("menuButton");

    const overlay = sidebar.querySelector(".sidebar-overlay");

    menuButton.onclick = () => {

        sidebar.classList.add("show");

    };

    overlay.onclick = () => {

        sidebar.classList.remove("show");

    };

    // =====================================
    // MENU CLICK
    // =====================================

    sidebar

        .querySelectorAll(".menu-list li")

        .forEach(item => {

            item.onclick = () => {

                sidebar.classList.remove("show");

                const page = item.dataset.page;

                switch (page) {

                    case "announcement":

                        navigate("announcement");

                        break;

                    case "logout":

                        if (confirm("Yakin ingin logout?")) {

                            localStorage.removeItem("isLogin");

                            localStorage.removeItem("currentUser");

                            navigate("login");

                        }

                        break;

                    default:

                        alert("Menu ini masih dalam pengembangan.");

                        break;

                }

            };

        });

}