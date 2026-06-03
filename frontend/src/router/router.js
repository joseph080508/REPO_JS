import { loginEvent, renderLogin } from "../pages/login.js";
import { renderAdmin } from "../pages/admin.js";

const Routes ={
    "/": {view:renderLogin, vewEvent:loginEvent},
    "/dashboard/admin":{view:renderAdmin}
}


export async function router() {
    // Obtiene ruta real
    const path = window.location.pathname;
    // Busca render
    const render = Routes[path];
    console.log(render);
    
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