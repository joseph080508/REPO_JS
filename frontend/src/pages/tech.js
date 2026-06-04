import { initModalTicket } from "../components/modalTIckets.js";
import { ticketTechCard } from "../components/ticketTechCard.js";
import { getTickets } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";
import { clearSession } from "../store/session.js";

// Guarda el texto buscado para conservarlo al refrescar las cards.
let ticketSearch = "";

// Pinta la vista del tecnico y prepara modal, logout y busqueda.
export async function renderTech(){
    const container = document.getElementById("app");
    container.innerHTML = await loadHTML('/src/views/tech.html');
    renderTechTickets()
    await initModalTicket(renderTechTickets)
    initLogout()
    initSearch()
}

// Conecta el boton de logout.
function initLogout() {
    const logoutButton = document.getElementById("btn-logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            clearSession();
        });
    }
}

// Renderiza tickets visibles para el tecnico y aplica el filtro.
async function renderTechTickets() {
    const container = document.getElementById("tickets")
    const user = JSON.parse(localStorage.getItem("user"))
    const tickets = await getTickets();
    const techTickets = tickets.filter(ticket => ticket.UserId == user.id || ticket.Technician == user.name);
    const filteredTickets = filterTickets(techTickets, ticketSearch);
    container.innerHTML = filteredTickets.map(ticket => ticketTechCard(ticket)).join('');
}

// Conecta la barra de busqueda del topbar.
function initSearch() {
    const searchInput = document.getElementById("ticket-search");
    if (!searchInput) return;

    searchInput.value = ticketSearch;
    searchInput.addEventListener("input", async (event) => {
        ticketSearch = event.target.value;
        await renderTechTickets();
    });
}

// Busca coincidencias en los campos principales del ticket.
function filterTickets(tickets, search) {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return tickets;

    return tickets.filter((ticket) => {
        return [
            ticket.id,
            ticket.ticketName,
            ticket.description,
            ticket.requestingClient,
            ticket.Technician,
            ticket.priority,
            ticket.status,
            ticket.caseType,
        ].some((value) => String(value ?? "").toLowerCase().includes(normalizedSearch));
    });
}
