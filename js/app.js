import { registerRoute, navigate } from "./router.js";

import { renderSplash } from "./pages/splash.js";
import { renderLogin } from "./pages/login.js";
import { renderRegister } from "./pages/register.js";
import { renderHome } from "./pages/home.js";
import { renderSearch } from "./pages/search.js";
import { renderPosting } from "./pages/posting.js";
import { renderChat } from "./pages/chat.js";
import { renderProfile } from "./pages/profile.js";

// Daftarkan semua halaman
registerRoute("splash", renderSplash);
registerRoute("login", renderLogin);
registerRoute("register", renderRegister);
registerRoute("home", renderHome);
registerRoute("search", renderSearch);
registerRoute("posting", renderPosting);
registerRoute("chat", renderChat);
registerRoute("profile", renderProfile);

// Jalankan aplikasi
document.addEventListener("DOMContentLoaded", () => {

    navigate("splash");

});