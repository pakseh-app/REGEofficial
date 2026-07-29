import { getAnnouncement } from "../data/announcements.js";

export function Announcement() {

    const item = getAnnouncement();

    if (!item) {

        return "";

    }

    return `

    <section class="announcement sticky-announcement">

        <div class="announcement-pin">

            📌 Pengumuman Ketua

        </div>

        <div class="announcement-content">

            <h3>

                ${item.title}

            </h3>

            <p>

                ${item.content}

            </p>

        </div>

    </section>

    `;

}