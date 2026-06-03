import { loginEvent, renderLogin } from "../pages/login.js";

const Routes ={
    "/": {view:renderLogin, vewEvent:loginEvent}
}


export async function router() {
    // Obtiene ruta real
    const path = window.location.pathname;
    // Busca render
    const render = Routes[path];
    if (render) {
        await render.view();
        await render.vewEvent?.();
    } else {
        document.getElementById('content').innerHTML = `
            <section>
                <h2>404 - Página no encontrada</h2>
            </section>
        `;
    }
}