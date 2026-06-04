export function ticketCard(ticket) {

    return `<article class="ticket-card">
            <header class="card-header">
                <span class="tag tag-red">D. COVERDALE</span>
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
            <span class="ticket-id">tk${ticket.id}</span>
            </footer>
     </article>`
}