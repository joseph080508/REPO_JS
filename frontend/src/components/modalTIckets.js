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

  btnNew   .addEventListener('click', () => modal.showModal());
  btnClose .addEventListener('click', () => modal.close());
  btnCancel.addEventListener('click', () => modal.close());
}