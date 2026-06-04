import { initModalTicket } from "../components/modalTIckets.js";
import { ticketCard } from "../components/ticketCard.js";
import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

export async function renderUser(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/user.html');
    renderTickets()
    await initModalTicket(renderTickets)
  
}

async function renderTickets() {
    const container = document.getElementById("tickets")
    const user = JSON.parse(localStorage.getItem("user"))
    const tickets = await getTickets();
    const userTickets = tickets.filter(ticket => ticket.UserId == user.id);
    container.innerHTML = userTickets.map(ticket => ticketCard(ticket)).join('');
}
