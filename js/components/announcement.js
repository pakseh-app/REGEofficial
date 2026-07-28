import { getAnnouncement } from "../data/announcements.js";

export function Announcement() {

    const item = getAnnouncement();

    // Tidak ada pengumuman
    if (!item) {

        return "";

    }

    return `

    <section class="announcement sticky-announcement">

        <div class="announcement-pin">

            📌 Pengumuman Ketua

        </div>

        <h3>

            ${item.title}

        </h3>

        <p>

            ${item.content}

        </p>

    </section>

    `;

}