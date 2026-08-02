import { Navbar } from "../components/navbar.js";
import { BottomNav } from "../components/bottomNav.js";
import { renderSidebar } from "../components/sidebar.js";

export function renderChat(){

    document.getElementById("app").innerHTML=`

    <div class="app">

        ${Navbar()}

        <div id="sidebar"></div>

        <main class="feed">

            <div class="chat-page">

                <div class="chat-header">

                    <img src="https://i.pravatar.cc/150?img=11">

                    <div>

                        <h3>Andi</h3>

                        <small>Online</small>

                    </div>

                </div>

                <div
                    id="chatMessages"
                    class="chat-messages">

                    <div class="bubble other">
                        Halo 👋
                    </div>

                    <div class="bubble me">
                        Halo juga
                    </div>

                </div>

                <div class="chat-input">

                    <input
                        id="chatText"
                        placeholder="Tulis pesan...">

                    <button id="sendChat">

                        <i class="fa-solid fa-paper-plane"></i>

                    </button>

                </div>

            </div>

        </main>

        ${BottomNav("chat")}

    </div>

    `;

    renderSidebar();

    document
        .getElementById("sendChat")
        .onclick=()=>{

            const input=document.getElementById("chatText");

            const text=input.value.trim();

            if(text==="") return;

            document
            .getElementById("chatMessages")
            .innerHTML+=`

            <div class="bubble me">

                ${text}

            </div>

            `;

            input.value="";

            const box=document.getElementById("chatMessages");

            box.scrollTop=box.scrollHeight;

        };

}