export function EditPostModal() {

    return `

    <div id="editPostModal" class="edit-post-overlay">

        <div class="edit-post-card">

            <h3>Edit Caption</h3>

            <textarea
                id="editCaptionInput"
                placeholder="Tulis caption..."></textarea>

            <div class="edit-post-actions">

                <button id="cancelEditPost">

                    Batal

                </button>

                <button id="saveEditPost">

                    Simpan

                </button>

            </div>

        </div>

    </div>

    `;

}