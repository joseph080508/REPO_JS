import { auth } from "../store/auth.js";
import { navigateTo } from "../main.js";
import { loadHTML } from "../utils/loadHtml.js"

// Pinta la vista de login dentro del contenedor principal.
export async function renderLogin() {
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('./src/views/login.html');
}

// Conecta el formulario de login y el paso hacia registro.
export function loginEvent() {
    document.getElementById("form-login").addEventListener('submit', async (e) => {
        e.preventDefault();
        // Toma las credenciales del formulario y delega la validacion al store.
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        await auth.onLogin(email, password);

    })

    document.getElementById("go-register").addEventListener('click', () => {
        // Navegacion SPA hacia la pantalla de registro.
        navigateTo("/register");
    })
}
