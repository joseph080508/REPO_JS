
export function ticketCard(ticket) {
    return `<tr>
              <td><span class="ticket-id">SUP-1507</span></td>
              <td>
                <div class="ticket-title">${ticket.ticketName}</div>
                <div class="ticket-cat">Human Resource › General</div>
              </td>
              <td>
                <div class="requester">
                  <img src="https://i.pravatar.cc/50?img=32" alt="">
                  <div class="requester-info">
                    <div class="name">Erica Johnson</div>
                    <div class="dept">Marketing</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="tech-wrap">
                  <img src="https://i.pravatar.cc/50?img=5" alt="">
                  <span class="tech-name">D. Coverdale</span>
                </div>
              </td>
              <td><span class="badge badge-red">Urgente</span></td>
              <td><span class="badge badge-orange"><span class="status-dot" style="background:var(--orange)"></span>En proceso</span></td>
              <td>
                <div class="action-btns">
                  <button class="action-btn edit" title="Editar"><i data-lucide="pencil"></i>  </button>
                  <button class="action-btn assign" title="Asignar técnico"><i data-lucide="user-round-plus"></i>  </button>
                  <button class="action-btn del" title="Eliminar"><i data-lucide="trash-2"></i>  </button>
                </div>
              </td>
            </tr>`
}