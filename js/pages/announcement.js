import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { AnnouncementForm } from "../components/announcementForm.js";
import { renderSidebar } from "../components/sidebar.js";

import {

    saveAnnouncement,

    clearAnnouncement

} from "../data/announcements.js";

export function renderAnnouncement() {

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            ${AnnouncementForm()}

        </main>

        ${BottomNav()}

    </div>

    `;

    renderSidebar();

    document

        .getElementById("publishAnnouncement")

        .onclick = () => {

            const title =

                document

                    .getElementById("announcementTitle")

                    .value

                    .trim();

            const content =

                document

                    .getElementById("announcementContent")

                    .value

                    .trim();

            const expired =

                document

                    .getElementById("announcementExpired")

                    .value;

            if (

                title === "" ||

                content === ""

            ) {

                alert("Judul dan isi wajib diisi.");

                return;

            }

            let expiredAt = null;

            if (expired) {

                expiredAt = new Date(

                    expired +

                    "T23:59:59"

                ).getTime();

            }

            saveAnnouncement({

                title,

                content,

                expiredAt

            });

            alert("✅ Pengumuman berhasil dipublikasikan.");

        };

}