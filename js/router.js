const routes = {};

export function registerRoute(name, renderFunction) {
    routes[name] = renderFunction;
}

export function navigate(name) {

    const page = routes[name];

    if (!page) {

        console.error(`Halaman "${name}" tidak ditemukan.`);
        return;

    }

    page();

}