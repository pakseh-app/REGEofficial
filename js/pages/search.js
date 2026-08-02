import { users } from "../data/users.js";
import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

export function renderSearch(){

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

}

function renderUser(list){

    return list.map(user=>`

        <div class="user-card">

            <img src="${user.avatar}">

            <div>

                <h4>${user.name}</h4>

                <small>${user.username}</small>

            </div>

        </div>

    `).join("");

}

function filterUser(){

    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const result = users.filter(user=>

        user.name.toLowerCase().includes(keyword) ||

        user.username.toLowerCase().includes(keyword)

    );

    document.getElementById("searchResult").innerHTML = renderUser(result);

}