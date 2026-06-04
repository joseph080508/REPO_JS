import { initModalTicket } from "../components/modalTIckets.js";
import { ticketCard } from "../components/ticketCard.js";
import { getTicketsById } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

export async function renderUser(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/user.html');
    renderTickets()
    initModalTicket(renderTickets)
    
}

export async function renderTickets() {
    const container = document.getElementById("tickets")
    const user = JSON.parse(localStorage.getItem("user"))
    const tickets = await getTicketsById(user.id);   
    container.innerHTML = tickets.map(ticket => ticketCard(ticket)).join('');
}
