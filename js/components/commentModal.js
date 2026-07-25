export function CommentModal() {

    return `

    <div id="commentModal" class="comment-modal">

        <div class="comment-sheet">

            <div class="comment-header">

                <h3>Komentar</h3>

                <button id="closeComment">
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <div id="commentList" class="comment-list">

                <div class="comment-item">
                    <b>Andi</b>
                    <p>Keren 🔥</p>
                </div>

                <div class="comment-item">
                    <b>Budi</b>
                    <p>Semangat terus 👍</p>
                </div>

            </div>

            <div class="comment-input">

                <input
                    id="commentText"
                    type="text"
                    placeholder="Tulis komentar...">

                <button id="sendComment">
                    Kirim
                </button>

            </div>

        </div>

    </div>

    `;

}