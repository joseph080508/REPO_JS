import {
  createReservation,
  getReservations
} from "@/services/reservation.service";

import {
  getSession
} from "@/utils";

import {
  navigateTo
} from "@/router/router";

export const createReservationController =
() => {

  const form =
    document.querySelector("#reservationForm");

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      const user =
        getSession();

      const workspace =
        form.workspace.value;

      const date =
        form.date.value;

      const startHour =
        form.startHour.value;

      const endHour =
        form.endHour.value;

      const reason =
        form.reason.value;

      const reservations =
        await getReservations();

      const exists =
        reservations.some(
          reservation =>
            reservation.workspace === workspace &&
            reservation.date === date &&
            reservation.startHour === startHour
        );

      if (exists) {

        alert(
          "Ya existe una reserva para ese horario"
        );

        return;
      }

      await createReservation({
        userId: user.id,
        workspace,
        date,
        startHour,
        endHour,
        reason,
        status: "pending"
      });

      alert(
        "Reserva creada correctamente"
      );

      navigateTo("/home");

    }
  );
};
