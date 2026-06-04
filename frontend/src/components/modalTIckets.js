import { getTicketById, postTicket, updateTicket } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

export async function initModalTicket(refreshTickets) {
  // Inyecta el HTML del modal solo si no existe ya en el DOM
  if (!document.getElementById('modal-ticket')) {
    const modalHTML = await loadHTML('/src/views/modalTicket.html');
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal     = document.getElementById('modal-ticket');
  const btnNew    = document.querySelector('.btn-new');
  const btnClose  = document.getElementById('modal-close');
  const btnCancel = document.getElementById('btn-cancel');
  const form = document.getElementById("form-ticket");
  let ticketIdActual = null;

  btnNew   .addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const statusSelect = document.getElementById("ticket-status");

    ticketIdActual = null;
    form.reset();
    statusSelect.value = "In Progress";
    showStatusByRole(user);
    modal.showModal();
  });
  btnClose .addEventListener('click', () => {
    ticketIdActual = null;
    modal.close();
  });
  btnCancel.addEventListener('click', () => {
    ticketIdActual = null;
    modal.close();
  });

  document.addEventListener('click', async (e) => {
    if (e.target.closest('.edit')) {
      const user = JSON.parse(localStorage.getItem("user"))
      ticketIdActual = e.target.closest('.edit').dataset.ticketId;
      const ticket = await getTicketById(ticketIdActual);
      const statusSelect = document.getElementById("ticket-status");

      if (!canEditTicket(user, ticket)) {
        ticketIdActual = null;
        return;
      }

      document.getElementById("ticket-title").value = ticket.ticketName;
      document.getElementById("ticket-desc").value = ticket.description;
      document.getElementById("ticket-prioridad").value = ticket.priority;
      document.getElementById("ticket-type").value = ticket.caseType;
      statusSelect.value = ticket.status;
      showStatusByRole(user);

      modal.showModal();
    }
  });

  form.onsubmit = async (e)=>{
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))

    const ticket = {
       ticketName: document.getElementById("ticket-title").value,
       description : document.getElementById("ticket-desc").value,
       priority : document.getElementById("ticket-prioridad").value,
       caseType : document.getElementById("ticket-type").value,
       Technician: user.role === "tech" ? user.name : "",
       UserId : user.id,
       requestingClient: user.name
    }

    if (user.role !== "client") {
      ticket.status = document.getElementById("ticket-status").value
    }

    if (ticketIdActual) {
      await updateTicket(ticketIdActual, ticket)
      if (refreshTickets) {
        await refreshTickets()
      }
      ticketIdActual = null
      modal.close()
      return
    }
    
    if (user.role === "client") {
      ticket.status = "In Progress"
    }

    await postTicket(ticket)
    if (refreshTickets) {
      await refreshTickets()
    }
    modal.close()

  }
}

function canEditTicket(user, ticket) {
  const isOwner = ticket.UserId == user.id;
  const isClosed = ticket.status === "closed" || ticket.status === "cerrado" || ticket.status === "Solved" || ticket.status === "Solucionado";

  if (user.role === "admin") {
    return true;
  }

  if (user.role === "tech") {
    return isOwner;
  }

  return isOwner && (!ticket.Technician || isClosed);
}

function showStatusByRole(user) {
  const statusGroup = document.getElementById("ticket-status-group");
  const statusSelect = document.getElementById("ticket-status");
  const canChangeStatus = user.role === "admin" || user.role === "tech";

  statusGroup.style.display = canChangeStatus ? "" : "none";
  statusSelect.disabled = !canChangeStatus;
}
