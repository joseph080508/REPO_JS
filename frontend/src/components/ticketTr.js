
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
                  <button class="action-btn edit" title="Editar"><i data-lucide="pencil"></i>  </button>
                  <button class="action-btn assign" title="Asignar técnico"><i data-lucide="user-round-plus"></i></button>
                  <button class="action-btn del" title="Eliminar" data-id="${ticket.id}"><i data-lucide="trash-2"></i></i>  </button>
                </div>
              </td>
            </tr>`
}