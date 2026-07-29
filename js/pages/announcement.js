import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";
import { AnnouncementForm } from "../components/announcementForm.js";

import {

    saveAnnouncement,

    getAnnouncement,

    clearAnnouncement

} from "../data/announcements.js";

export function renderAnnouncement() {

    const announcement = getAnnouncement();

    document.getElementById("app").innerHTML = `

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="info-header">

                <h2>

                    📢 Pusat Informasi

                </h2>

                <p>

                    Kelola seluruh informasi resmi REGE Official.

                </p>

            </div>

            ${AnnouncementForm()}

            <div class="info-card">

                <h3>

                    📌 Pengumuman Aktif

                </h3>

                ${
                    announcement

                    ?

                    `

                    <div class="current-announcement">

                        <h4>

                            ${announcement.title}

                        </h4>

                        <p>

                            ${announcement.content}

                        </p>

                        <button id="deleteAnnouncement">

                            🗑 Hapus Pengumuman

                        </button>

                    </div>

                    `

                    :

                    `

                    <p>

                        Belum ada pengumuman.

                    </p>

                    `

                }

            </div>

            <div class="info-card">

                <h3>

                    🚧 Modul Berikutnya</h3>

                <ul>

                    <li>📅 Agenda Kegiatan</li>

                    <li>📄 Surat</li>

                    <li>🖼 Dokumentasi</li>

                </ul>

            </div>

        </main>

        ${BottomNav()}

    </div>

    `;

    renderSidebar();

    // ===========================
    // PUBLIKASI
    // ===========================

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

            renderAnnouncement();

        };

    // ===========================
    // HAPUS
    // ===========================

    const deleteBtn =

        document.getElementById("deleteAnnouncement");

    if (deleteBtn) {

        deleteBtn.onclick = () => {

            if (

                confirm(

                    "Hapus pengumuman ini?"

                )

            ) {

                clearAnnouncement();

                alert("Pengumuman dihapus.");

                renderAnnouncement();

            }

        };

    }

}