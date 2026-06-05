import { getTicketById, postTicket, updateTicket } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

// Inicializa el modal de crear/editar tickets y recibe un callback para refrescar la vista.
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
  const modalTitle = document.getElementById('ticket-modal-title');
  const btnSubmit = document.getElementById('ticket-submit');
  const form = document.getElementById("form-ticket");
  let ticketIdActual = null;

  // Abre el modal en modo crear.
  btnNew   .addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const statusSelect = document.getElementById("ticket-status");

    ticketIdActual = null;
    form.reset();
    modalTitle.textContent = "Nueva reserva";
    btnSubmit.textContent = "Crear reserva";
    statusSelect.value = "In Progress";
    showStatusByRole(user);
    modal.showModal();
  });

  // Cierra el modal y limpia el modo edicion.
  btnClose .addEventListener('click', () => {
    ticketIdActual = null;
    modal.close();
  });
  btnCancel.addEventListener('click', () => {
    ticketIdActual = null;
    modal.close();
  });

  // Abre el modal en modo editar cuando se presiona un boton .edit.
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.edit')) {
      const user = JSON.parse(localStorage.getItem("user"))
      ticketIdActual = e.target.closest('.edit').dataset.ticketId;
      const ticket = await getTicketById(ticketIdActual);
      const statusSelect = document.getElementById("ticket-status");

      if (!canEditTicket(user, ticket)) {
        // Si el usuario no tiene permiso, no se abre el modal.
        ticketIdActual = null;
        return;
      }

      document.getElementById("ticket-title").value = ticket.ticketName;
      document.getElementById("ticket-desc").value = ticket.description;
      document.getElementById("reservation-date").value = ticket.reservationDate || "";
      document.getElementById("reservation-time").value = ticket.reservationTime || "";
      document.getElementById("ticket-prioridad").value = ticket.priority;
      document.getElementById("ticket-type").value = ticket.caseType;
      modalTitle.textContent = "Actualizar reserva";
      btnSubmit.textContent = "Actualizar reserva";
      statusSelect.value = ticket.status;
      showStatusByRole(user);

      modal.showModal();
    }
  });

  // Decide si el formulario crea un ticket nuevo o actualiza uno existente.
  form.onsubmit = async (e)=>{
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))

    const ticket = {
       ticketName: document.getElementById("ticket-title").value,
       description : document.getElementById("ticket-desc").value,
       reservationDate: document.getElementById("reservation-date").value,
       reservationTime: document.getElementById("reservation-time").value,
       priority : document.getElementById("ticket-prioridad").value,
       caseType : document.getElementById("ticket-type").value,
       Technician: user.role === "tech" ? user.name : "",
       UserId : user.id,
       requestingClient: user.name
    }

    if (user.role !== "client") {
      // Admin y tecnico pueden definir estado desde el modal.
      ticket.status = document.getElementById("ticket-status").value
    }

    if (ticketIdActual) {
      // Si hay ticketIdActual, el formulario esta en modo actualizacion.
      await updateTicket(ticketIdActual, ticket)
      if (refreshTickets) {
        await refreshTickets()
      }
      ticketIdActual = null
      modal.close()
      return
    }
    
    if (user.role === "client") {
      // Los clientes siempre crean tickets en progreso.
      ticket.status = "In Progress"
    }

    await postTicket(ticket)
    if (refreshTickets) {
      await refreshTickets()
    }
    modal.close()

  }
}

// Define permisos para editar segun rol, propiedad del ticket y estado.
function canEditTicket(user, ticket) {
  const isOwner = ticket.UserId == user.id;
  const isClosed = ticket.status === "closed" || ticket.status === "Solved" ;

  if (user.role === "admin") {
    return true;
  }

  if (user.role === "tech") {
    return true;
  }

  return isOwner && (!ticket.Technician || isClosed);
}

// Muestra u oculta el campo status segun el rol del usuario.
function showStatusByRole(user) {
  const statusGroup = document.getElementById("ticket-status-group");
  const statusSelect = document.getElementById("ticket-status");
  const canChangeStatus = user.role === "admin" || user.role === "tech";

  statusGroup.style.display = canChangeStatus ? "" : "none";
  statusSelect.disabled = !canChangeStatus;
}
