import { events } from "../data/events.js";

export function EventCard() {

    if (events.length === 0) {

        return "";

    }

    const event = events[0];

    return `

    <section class="event-card">

        <div class="event-header">

            <span class="event-badge">

                📅 Kegiatan Hari Ini

            </span>

        </div>

        <h3>

            ${event.title}

        </h3>

        <p>

            ${event.description}

        </p>

        <div class="event-info">

            <span>

                🕒 ${event.time}

            </span>

            <span>

                📍 ${event.location}

            </span>

        </div>

        <button

            id="attendanceBtn"

            class="attendance-btn"

            data-id="${event.id}">

            ✅ Hadir

        </button>

    </section>

    `;

}