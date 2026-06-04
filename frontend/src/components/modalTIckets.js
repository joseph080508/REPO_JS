import { renderTicketsToAdmin } from "../pages/admin.js";
import { getTicketById, postTicket, updateTicket } from "../services/api.js";
import { loadHTML } from "../utils/loadHtml.js";

export async function initModalTicket() {
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
    ticketIdActual = null;
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
      ticketIdActual = e.target.closest('.edit').dataset.ticketId;
      const ticket = await getTicketById(ticketIdActual);

      document.getElementById("ticket-title").value = ticket.ticketName;
      document.getElementById("ticket-desc").value = ticket.description;
      document.getElementById("ticket-prioridad").value = ticket.priority;
      document.getElementById("ticket-type").value = ticket.caseType;

      modal.showModal();
    }
  });

  form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"))

    const ticket = {
       ticketName: document.getElementById("ticket-title").value,
       description : document.getElementById("ticket-desc").value,
       priority : document.getElementById("ticket-prioridad").value,
       caseType : document.getElementById("ticket-type").value,
       Technician: "",
       status: "In Progress",
       UserId : user.id,
       requestingClient: user.name
    }

    if (ticketIdActual) {
      await updateTicket(ticketIdActual, ticket)
      await renderTicketsToAdmin()
      ticketIdActual = null
      modal.close()
      return
    }
    
    await postTicket(ticket)
    await renderTicketsToAdmin()
    modal.close()

  })
}
