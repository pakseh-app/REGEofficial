import { posts } from "../data/dummy.js";

export function PostCard(){

    // ambil posting buatan user
    const myPosts = JSON.parse(
        localStorage.getItem("posts") || "[]"
    );

    // gabungkan posting baru + dummy
    const allPosts = [...myPosts, ...posts];

    return allPosts.map((post,index)=>`

    <div class="post">

        <div class="post-header">

            <img src="${post.avatar}">

            <div>

                <h4>${post.name}</h4>

                <small>${post.time}</small>

            </div>

        </div>

        <p>

            ${post.caption}

        </p>

        <img
            class="post-image"
            src="${post.image}">

        <div class="actions">

            <button
                class="like-btn">

                ❤️ <span>${post.likes}</span>

            </button>

            <button
                class="comment-btn"
                data-id="${index}">

                💬 <span>${post.comments}</span>

            </button>

        </div>

    </div>

    `).join("");

}