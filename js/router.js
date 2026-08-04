import { getMember } from "./data/members.js";
import {
    getCurrentUser,
    updateCurrentUser
} from "./data/currentUser.js";

const routes = {};

export function registerRoute(name, renderFunction) {
    routes[name] = renderFunction;
}

export async function navigate(name) {

    const currentUser = getCurrentUser();

    if (currentUser?.uid) {

        try {

            const latestUser = await getMember(currentUser.uid);

            if (latestUser) {

                updateCurrentUser(latestUser);

            }

        } catch (err) {

            console.error("Gagal sinkron user:", err);

        }

    }

    const page = routes[name];

    if (!page) {

        console.error(`Halaman "${name}" tidak ditemukan.`);
        return;

    }

    page();

}