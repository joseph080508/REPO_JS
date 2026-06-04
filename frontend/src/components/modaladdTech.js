import { loadHTML } from "../utils/loadHtml.js";
import { getUsuarios, updateTicketTech } from "../services/api.js";
import { addTech } from "./tecnicos.js";
import { renderTicketsToAdmin } from "../pages/admin.js";


export async function initModalTicketTech() {
  // Inyecta el HTML del modal solo si no existe ya en el DOM
  if (!document.getElementById('modal-tech')) {
    const modalHTML = await loadHTML('/src/views/modaladdTechtoTicket.html');
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  const modal     = document.getElementById('modal-tech');
  const btnClose  = document.getElementById('modal-close-tech');
  const btnCancel = document.getElementById('btn-cancel-tech');
  const formTech  = document.getElementById('form-tech');
  let ticketIdActual = null;

  // Event delegation para todos los botones .assign
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.assign')) {
      ticketIdActual = e.target.closest('.assign').dataset.ticketId;
      await loadTecnicos();
      modal.showModal();
    }
  });
  btnClose .addEventListener('click', () => modal.close());
  btnCancel.addEventListener('click', () => modal.close());

  formTech.addEventListener('submit', async (e) => {
    e.preventDefault();
    const techId = document.getElementById('tecnicos').value;
    
    if (techId && ticketIdActual) {
      try {
        await updateTicketTech(ticketIdActual, techId);
        await renderTicketsToAdmin();
        modal.close();
      } catch (error) {
        alert('Error al asignar técnico');
        console.error(error);
      }
    }
  });

  async function loadTecnicos() {
    try {
      const tecnicos = await getUsuarios('tech');
      const selectTecnicos = document.getElementById('tecnicos');
      selectTecnicos.innerHTML = tecnicos.map(tech => addTech(tech)).join('');
    } catch (error) {
      console.error('Error cargando técnicos:', error);
    }
  }
}