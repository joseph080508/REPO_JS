import { renderTicketsToAdmin } from "../pages/admin.js";
import { postTicket } from "../services/api.js";
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

  btnNew   .addEventListener('click', () => modal.showModal());
  btnClose .addEventListener('click', () => modal.close());
  btnCancel.addEventListener('click', () => modal.close());

  const form = document.getElementById("form-ticket")
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
    
    await postTicket(ticket)
    await refreshTickets()
    modal.close()

  })
}