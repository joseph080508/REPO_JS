import { getTickets, getUsuarios } from "../services/api.js";

// Calcula estadisticas de tecnicos cruzando usuarios tech con tickets asignados.
export async function loadTechStats() {
  const [tickets, techs] = await Promise.all([
    getTickets(),
    getUsuarios('tech')
  ]);

  // Cuenta cuantos tickets tiene cada tecnico por nombre.
  const assignedCounts = tickets.reduce((acc, ticket) => {
    const techName = ticket.Technician || 'Sin asignar';
    acc[techName] = (acc[techName] || 0) + 1;
    return acc;
  }, {});

  // Devuelve los tecnicos con una etiqueta y su conteo de asignaciones.
  return techs.map(tech => ({
    name: tech.name,
    roleLabel: 'Técnico',
    count: assignedCounts[tech.name] || 0
  }));
}
