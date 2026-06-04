import { initModalTicket } from "../components/modalTIckets.js";
import { ticketCard } from "../components/ticketCard.js";
import { getTicketsById } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";
import { createIcons, icons, User } from "lucide";

export async function renderUser(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/user.html');
    createIcons({ icons });
    renderTickets()
    await initModalTicket();
    const form = document.getElementById("form-ticket")
}

async function renderTickets() {
    const container = document.getElementById("tickets")
    const user = JSON.parse(localStorage.getItem("user"))
    const tickets = await getTicketsById(user.id);   
    container.innerHTML = tickets.map(ticket => ticketCard(ticket)).join('');
}