import { initModalTicket } from "../components/modalTIckets.js";
import { ticketTechCard } from "../components/ticketTechCard.js";
import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

export async function renderTech(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/tech.html');
    renderTechTickets()
    await initModalTicket(renderTechTickets)
}

async function renderTechTickets() {
    const container = document.getElementById("tickets")
    const user = JSON.parse(localStorage.getItem("user"))
    const tickets = await getTickets();
    const techTickets = tickets.filter(ticket => ticket.UserId == user.id);
    container.innerHTML = techTickets.map(ticket => ticketTechCard(ticket)).join('');
}
