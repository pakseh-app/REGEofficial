import { posts } from "../data/posts.js";

export function PostCard() {

    return posts.map(post => {

        // Gunakan avatar & nama profil jika ini postingan milik user
        let avatar = post.avatar;
        let name = post.name;

        if (post.isMe) {

            avatar = localStorage.getItem("profileAvatar") || avatar;

            name = localStorage.getItem("profileName") || name;

        }

        return `

        <div class="post">

            <div class="post-header">

                <img
                    src="${avatar}"
                    class="avatar">

                <div>

                    <h4>${name}</h4>

                    <small>${post.time}</small>

                </div>

            </div>

            <p>${post.caption}</p>

            <img
                src="${post.image}"
                class="post-image">

            <div class="actions">

                <button
                    class="like-btn"
                    data-id="${post.id}">

                    ❤️ <span>${post.likes}</span>

                </button>

                <button
                    class="comment-btn"
                    data-id="${post.id}">

                    💬 <span>${post.comments.length}</span>

                </button>

            </div>

        </div>

        `;

    }).join("");

}