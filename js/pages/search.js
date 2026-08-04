import { getMembers } from "../data/members.js";
import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { navigate } from "../router.js";

let users = [];

export async function renderSearch() {

    users = await getMembers();

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="search-box">

                <input
                    id="searchInput"
                    type="text"
                    placeholder="Cari pengguna...">

            </div>

            <div id="searchResult">

                ${renderUser(users)}

            </div>

        </main>

        ${BottomNav("search")}

    </div>

    `;

    renderSidebar();

    document

        .getElementById("searchInput")

        .addEventListener("input", filterUser);

        bindUserClick();

}

function renderUser(list) {

    if (list.length === 0) {

        return `

        <div class="empty-search">

            Tidak ada pengguna ditemukan.

        </div>

        `;

    }

    return list.map(user => `

        <div
    class="user-card"
    data-uid="${user.uid}"
>

            <img
                src="${user.avatar || "assets/default-avatar.png"}"
                draggable="false">

            <div>

                <h4>${user.fullName}</h4>

                <small>@${user.username}</small>

            </div>

        </div>

    `).join("");

}

function filterUser() {

    const keyword = document

        .getElementById("searchInput")

        .value

        .toLowerCase()

        .trim();

    const result = users.filter(user =>

        (user.fullName || "")

            .toLowerCase()

            .includes(keyword)

        ||

        (user.username || "")

            .toLowerCase()

            .includes(keyword)

    );

    document.getElementById("searchResult").innerHTML = renderUser(result);

bindUserClick();

}

function bindUserClick() {

    document

        .querySelectorAll(".user-card")

        .forEach(card => {

            card.onclick = () => {

                navigate(

                    "profileUser",

                    card.dataset.uid

                );

            };

        });

}