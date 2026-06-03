import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";
import { createIcons, icons } from "lucide";
import {ticketCard} from "../components/ticketCard.js"


export async function renderAdmin(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/admin.html');
    createIcons({ icons });
    renderTickets()
}


async function renderTickets() {
    const container = document.getElementById("tbody")
    const tickets = await getTickets();
    container.innerHTML = tickets.map(ticket => ticketCard(ticket)).join('');
}