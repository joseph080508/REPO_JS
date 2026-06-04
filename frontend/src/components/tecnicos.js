
// Renderiza una opcion del select de tecnicos.
export function addTech(usuario) {
  return `<option value="${usuario.name}">${usuario.name}</option>`;
}
