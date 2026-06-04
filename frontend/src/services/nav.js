import { navigateTo } from "../main.js";

// Redirige al dashboard correcto segun el rol autenticado.
export function rolView(rol) {
    switch (rol) {
        case "admin":
            navigateTo("/dashboard/admin")
            break;
        case "tech":
            navigateTo("/dashboard/tech")
            break;
        case "client":
            navigateTo("/dashboard/client")
            break;
        default:

            break;
    }
    
}
