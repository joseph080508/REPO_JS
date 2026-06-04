import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";
import { createIcons, icons } from "lucide";
import {ticketTr} from "../components/ticketTr.js"
import { initModalTicket } from "../components/modalTIckets.js";


export async function renderAdmin(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/admin.html');
    createIcons({ icons });
    renderTicketsToAdmin()
    await initModalTicket()
}


export async function renderTicketsToAdmin() {
    const container = document.getElementById("tbody")
    const tickets = await getTickets();
    container.innerHTML = tickets.map(ticket => ticketTr(ticket)).join('');
}