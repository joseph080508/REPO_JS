import { navigateTo } from "../main.js"

const TIMEOUT_DURATION = 300000
let inactivityTimer = null

// Guarda el usuario autenticado en localStorage y activa el timeout.
export function saveSession(user){
    localStorage.setItem('user', JSON.stringify(user))
    startInactivityTimer()
}

// Obtiene el usuario guardado; devuelve null si no hay sesion.
export function getSession(){
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

// Cierra sesion, limpia el temporizador y vuelve al login.
export function clearSession(){
    localStorage.removeItem('user')
    clearTimeout(inactivityTimer)
    navigateTo("/")
}

function startInactivityTimer(){
    clearTimeout(inactivityTimer)
    inactivityTimer = setTimeout(() => {
        // Expulsa al usuario si supera el tiempo sin actividad.
        clearSession()
        navigateTo("/")
        alert('Tu sesion expiro por inactividad')
    }, TIMEOUT_DURATION)
}

export function resetInactivityTimer(){
 if (getSession()){
    // Solo reinicia el timer cuando ya existe una sesion activa.
    startInactivityTimer()
 }
}
