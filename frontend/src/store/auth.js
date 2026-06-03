import { navigateTo } from "../main.js";
import { rolView } from "../services/nav.js";
import { authClient } from "../utils/https.js";
import { saveSession } from "./session.js";

export const auth = {
  async onLogin(email, password) {
    const res = await authClient.get(
      `/users?email=${email}&password=${password}`,
    );
    if (!res.data[0]) {
      document.getElementById("error-msg").style.display = "block";
      return;
    } else {
      saveSession(res.data[0]);
      rolView(res.data[0]["role"]);
    }
  },
};
