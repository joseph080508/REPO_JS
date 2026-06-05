import {
  updateReservation
} from "@/services/reservation.service";

import {
  navigateTo
} from "@/router/router";

export const editReservationController =
(id) => {

  const form =
    document.querySelector(
      "#editReservationForm"
    );

  form.addEventListener(
    "submit",
    async (e) => {

      e.preventDefault();

      await updateReservation(
        id,
        {
          workspace:
            form.workspace.value,

          date:
            form.date.value,

          startHour:
            form.startHour.value,

          endHour:
            form.endHour.value,

          reason:
            form.reason.value,
        }
      );

      alert(
        "Reserva actualizada"
      );

      navigateTo("/home");

    }
  );
};
