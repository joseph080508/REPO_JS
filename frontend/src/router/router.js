import { loginEvent, renderLogin } from "../pages/login.js";
import { registerEvent, renderRegister } from "../pages/register.js";
import { renderAdmin } from "../pages/admin.js";
import { renderUser } from "../pages/user.js";
import { renderTech } from "../pages/tech.js";

// Relaciona cada ruta de la SPA con su vista y sus eventos.
const Routes = {
    "/": { view: renderLogin, vewEvent: loginEvent },
    "/register": { view: renderRegister, vewEvent: registerEvent },
    "/dashboard/admin": { view: renderAdmin },
    "/dashboard/tech": { view: renderTech },
    "/dashboard/client": { view: renderUser },
};

export async function router() {
    // Busca la configuracion de la ruta actual.
    const path = window.location.pathname;
    const render = Routes[path];

    if (render) {
        // Primero pinta el HTML y luego conecta eventos de la vista.
        await render.view();
        await render.vewEvent?.();
    } else {
        document.getElementById('app').innerHTML = `
            <section>
                <h2>404 - Page not found</h2>
            </section>
        `;
    }
}
