import { getTickets, getUsuarios } from "../services/api.js";

export async function loadTechStats() {
  const [tickets, techs] = await Promise.all([
    getTickets(),
    getUsuarios('tech')
  ]);

  const assignedCounts = tickets.reduce((acc, ticket) => {
    const techName = ticket.Technician || 'Sin asignar';
    acc[techName] = (acc[techName] || 0) + 1;
    return acc;
  }, {});

  return techs.map(tech => ({
    name: tech.name,
    roleLabel: 'Técnico',
    count: assignedCounts[tech.name] || 0
  }));
}
