import bcrypt, { hash } from "bcryptjs"
import { router } from "./router/router.js";

let hp = "$2b$10$zN7Q5UWhKXW2pSLCvqQ9pOjWgEVmH/d9OCBy/9QmVOD/TPY0Y0sXm"

/**
 * Navega entre rutas sin recargar.
 *
 * @param {string} url
 */
export function navigateTo(url) {
    history.pushState(null, null, url);
    router();
}

document.addEventListener("DOMContentLoaded", ()=>{
    router()
})

window.addEventListener('popstate', router);