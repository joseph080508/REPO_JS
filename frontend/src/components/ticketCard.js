import { createElement, Pencil } from "lucide";

// Convierte un icono de lucide en SVG listo para insertar en HTML string.
const iconSVG = (icon, attrs = {}) => createElement(icon, attrs).outerHTML;

// Renderiza una tarjeta de ticket para la vista de cliente.
export function ticketCard(ticket) {
    // El cliente puede editar si no hay tecnico asignado o si el ticket esta cerrado/resuelto.
    const isClosed = ticket.status === "closed" || ticket.status === "cerrado" || ticket.status === "Solved" || ticket.status === "Solucionado";
    const canEdit = !ticket.Technician || isClosed;
    const editButton = canEdit ? `<button class="action-btn edit" data-ticket-id="${ticket.id}" title="Editar">${iconSVG(Pencil)}</button>` : "";

    return `<article class="ticket-card">
            <header class="card-header">
                <span class="tag tag-red">Technician: ${ticket.Technician}</span>
                <span class="priority priority-urgent">${ticket.priority}</span>
            </header>

            <h3 class="card-title">${ticket.ticketName}</h3>
            <p class="card-cat">${ticket.description}</p>

            <footer class="card-footer">
            <address class="requester">
                <img src="../img/perfil.png" alt="Erica Johnson">
                <p>
                <strong class="req-name">${ticket.requestingClient}</strong>
                </p>
            </address>
            <div class="action-btns">
                ${editButton}
                <span class="ticket-id">tk${ticket.id}</span>
            </div>
            </footer>
     </article>`
}
