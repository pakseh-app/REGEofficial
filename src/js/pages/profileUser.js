import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

import { getMember } from "../data/members.js";

export async function renderProfileUser(uid) {

    const user = await getMember(uid);

    if (!user) {

        document.getElementById("app").innerHTML = `

        <div class="app">

            ${Navbar()}

            <main class="feed">

                <h2 style="text-align:center;padding:40px">

                    Pengguna tidak ditemukan

                </h2>

            </main>

            ${BottomNav()}

        </div>

        `;

        return;

    }

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="profile-card">

                <div class="profile-photo">

                    <img

                        class="profile-avatar"

                        src="${user.avatar}"

                        draggable="false">

                </div>

                <h2>

                    ${user.fullName}

                </h2>

                <p>

                    ${user.bio || ""}

                </p>

                <div class="profile-stats">

                    <div>

                        <h3>${user.posting || 0}</h3>

                        <small>Posting</small>

                    </div>

                    <div>

                        <h3>${user.followers || 0}</h3>

                        <small>Followers</small>

                    </div>

                    <div>

                        <h3>${user.following || 0}</h3>

                        <small>Following</small>

                    </div>

                </div>

                <button id="followBtn">

                    Follow

                </button>

            </div>

        </main>

        ${BottomNav()}

    </div>

    `;

    renderSidebar();

}