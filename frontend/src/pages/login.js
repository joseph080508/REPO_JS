import { auth } from "../store/auth.js";
import { loadHTML } from "../utils/loadHtml.js"

export async function renderLogin() {
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('./src/views/login.html');
}

export function loginEvent() {
    document.getElementById("form-login").addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        await auth.onLogin(email, password);

    })
}