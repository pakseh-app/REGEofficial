export function AnnouncementForm() {

    return `

    <div class="announcement-form">

        <h2>

            📌 Buat Pengumuman

        </h2>

        <input

            id="announcementTitle"

            type="text"

            placeholder="Judul Pengumuman">

        <textarea

            id="announcementContent"

            placeholder="Isi Pengumuman"></textarea>

        <label>

            Berlaku sampai

        </label>

        <input

            id="announcementExpired"

            type="date">

        <button

            id="publishAnnouncement">

            Publikasikan

        </button>

    </div>

    `;

}