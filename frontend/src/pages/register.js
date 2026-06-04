import { navigateTo } from "../main.js";
import { auth } from "../store/auth.js";
import { loadHTML } from "../utils/loadHtml.js";

// Pinta la vista de registro dentro del contenedor principal.
export async function renderRegister() {
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('./src/views/register.html');
}

// Conecta el formulario de registro y el regreso al login.
export function registerEvent() {
    document.getElementById("form-register").addEventListener('submit', async (e) => {
        e.preventDefault();
        // Recoge los datos necesarios para crear el usuario en auth-db.
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        await auth.onRegister(name, email, password);
    });

    document.getElementById("go-login").addEventListener('click', () => {
        // Regresa al login sin recargar la pagina.
        navigateTo("/");
    });
}
