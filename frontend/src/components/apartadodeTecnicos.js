import { loadTechStats } from "./logicadeTecnicos.js";

export async function renderTechPanel() {
  const container = document.getElementById('table-tech');
  if (!container) return;

  const techStats = await loadTechStats();

  container.innerHTML = techStats.map(tech => renderTechItem(tech)).join('')
    || '<div class="tech-list-item">No hay técnicos activos</div>';
}

function renderTechItem(tech) {
    
  return `
    <div class="tech-list-item">
      <img src="../../img/perfil.png" alt="${tech.name}">
      <div class="tech-info">
        <div class="tname">${tech.name}</div>
        <div class="trole">${tech.roleLabel}</div>
      </div>
      <span class="tech-count">${tech.count}</span>
    </div>
  `;
}
