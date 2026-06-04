import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";
import { ticketTr } from "../components/ticketTr.js";
import { initModalTicket } from "../components/modalTIckets.js";
import { initModalTicketTech } from "../components/modaladdTech.js";
import { addTech } from "../components/tecnicos.js";
import { renderTechPanel } from "../components/apartadodeTecnicos.js";

export async function renderAdmin(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/admin.html');
    await renderTicketsToAdmin();
    await renderTechPanel();
    await initModalTicket();
    await initModalTicketTech();
}

export async function renderTicketsToAdmin() {
    const container = document.getElementById("tbody");
    const tickets = await getTickets();
    container.innerHTML = tickets.map(ticket => ticketTr(ticket)).join('');
    await renderTechPanel();
}

function attachDelete() {
    const container = document.getElementById("tbody");
    if (!container) return;
    container.addEventListener("click", oneDeleteClick);
}

async function oneDeleteClick(event) {
    const button = event.target.closest("button.del");
    if (!button) return;

    const id = button.dataset.id;
    if (!id) return;

    const confirmed = confirm("Do you confirm deleting this ticket?");
    if (!confirmed) return;

    try {
        await deleteTicket(id);
        await renderTickets();
        alert("Ticket deleted successfully.");
    } catch (error) {
        console.error(error);
        alert("Error deleting the ticket.");
    }
}
