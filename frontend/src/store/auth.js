import { navigateTo } from "../main.js";
import { rolView } from "../services/nav.js";
import { authClient } from "../utils/https.js";
import { saveSession } from "./session.js";

export const auth = {
  // Valida credenciales contra json-server y redirige segun el rol.
  async onLogin(email, password) {
    const res = await authClient.get(
      `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    );
    if (!res.data[0]) {
      document.getElementById("error-msg").style.display = "block";
      return;
    } else {
      saveSession(res.data[0]);
      rolView(res.data[0]["role"]);
    }
  },

  // Registra clientes nuevos con estado activo y rol client por defecto.
  async onRegister(name, email, password) {
    const res = await authClient.get(
      `/users?email=${encodeURIComponent(email)}`,
    );
    const usersRes = await authClient.get('/users');

    if (res.data[0]) {
      document.getElementById("error-msg").style.display = "block";
      return;
    }

    const nextId = String(usersRes.data.length + 1);
    const newUser = {
      id: nextId,
      name,
      email,
      password,
      role: "client",
      isActive: true,
    };

    const registerRes = await authClient.post('/users', newUser);
    // json-server puede reemplazar el id enviado; este PATCH deja el id esperado.
    const user = registerRes.data.id === nextId
      ? registerRes.data
      : (await authClient.patch(`/users/${registerRes.data.id}`, { id: nextId })).data;

    saveSession(user);
    rolView(user["role"]);
  },
};
