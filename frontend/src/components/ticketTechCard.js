import { createElement, Pencil } from "lucide";

// Convierte un icono de lucide en SVG listo para insertar en HTML string.
const iconSVG = (icon, attrs = {}) => createElement(icon, attrs).outerHTML;

// Renderiza una tarjeta de ticket para la vista de tecnico.
export function ticketTechCard(ticket) {
    return `<article class="ticket-card">
            <header class="card-header">
                <span class="tag tag-red">${ticket.caseType}</span>
                <span class="priority priority-urgent">${ticket.priority}</span>
            </header>

            <h3 class="card-title">${ticket.ticketName}</h3>
            <p class="card-cat">${ticket.description}</p>
            <p class="card-meta">Fecha: ${ticket.reservationDate || '-'} · Hora: ${ticket.reservationTime || '-'}</p>

            <footer class="card-footer">
            <address class="requester">
                <img src="../img/perfil.png" alt="">
                <p>
                <strong class="req-name">${ticket.requestingClient}</strong>
                </p>
            </address>
            <div class="action-btns">
                <button class="action-btn edit" data-ticket-id="${ticket.id}" title="Editar">${iconSVG(Pencil)}</button>
                <span class="ticket-id">tk${ticket.id}</span>
            </div>
            </footer>
     </article>`
}
