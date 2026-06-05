import { createElement, Pencil, UserRoundPlus, Trash2 } from "lucide";

// Convierte iconos de lucide en SVG para usarlos dentro de botones.
const iconSVG = (icon, attrs = {}) => createElement(icon, attrs).outerHTML;

// Renderiza una fila de la tabla de reservas del administrador.
export function ticketTr(ticket) {
    return `<tr>
              <td><span class="ticket-id">tk${ticket.id}</span></td>
              <td>
                <div class="ticket-title">${ticket.ticketName}</div>
                <div class="ticket-cat">${ticket.description}</div>
              </td>
              <td>
                <div class="requester">
                  <img src="../img/perfil.png" alt="">
                  <div class="name">${ticket.requestingClient}</div>
                </div>
              </td>
              <td>${ticket.reservationDate || '-'}</td>
              <td>${ticket.reservationTime || '-'}</td>
              <td>
                <div class="tech-wrap">
                  <img src="../img/perfil.png" alt="">
                  <span class="tech-name">${ticket.Technician}</span>
                </div>
              </td>
              <td><span class="badge badge-red">${ticket.priority}</span></td>
              <td><span class="badge badge-orange"><span class="status-dot" style="background:var(--orange)"></span>${ticket.status}</span></td>
              <td>
                <div class="action-btns">
                  <button class="action-btn edit" data-ticket-id="${ticket.id}" title="Editar">${iconSVG(Pencil)}  </button>
                  <button class="action-btn assign" data-ticket-id="${ticket.id}" title="Asignar técnico">${iconSVG(UserRoundPlus)}</button>
                  <button class="action-btn del" title="Eliminar" data-id=${ticket.id}>${iconSVG(Trash2)}  </button>
                </div>
              </td>
            </tr>`
}
