import ReservationCard from "@components/ReservationCard";

import {
  getReservations,
  approveReservation,
  rejectReservation,
  deleteReservation,
  cancelReservation,
} from "@services/reservation.service";

import { getSession } from "@/utils";

export const homeController = async () => {

  const container =
    document.querySelector("#reservationsContainer");

  const user = getSession();

  const reservations =
    await getReservations();

  const filteredReservations =
    user.role === "admin"
      ? reservations
      : reservations.filter(
          (reservation) =>
            reservation.userId === user.id
        );

  container.innerHTML =
    filteredReservations.length
      ? filteredReservations
          .map((reservation) =>
            ReservationCard(reservation)
          )
          .join("")
      : `
          <div class="w-full text-center py-8 col-span-2">
            No hay reservas
          </div>
        `;

  document
    .querySelectorAll(".approve-btn")
    .forEach((btn) => {
      btn.addEventListener("click", async () => {

        if (user.role !== "admin") return;

        await approveReservation(
          btn.dataset.id
        );

        location.reload();
      });
    });

  document
    .querySelectorAll(".reject-btn")
    .forEach((btn) => {
      btn.addEventListener("click", async () => {

        if (user.role !== "admin") return;

        await rejectReservation(
          btn.dataset.id
        );

        location.reload();
      });
    });

  document
    .querySelectorAll(".delete-btn")
    .forEach((btn) => {
      btn.addEventListener("click", async () => {

        if (user.role !== "admin") return;

        const confirmDelete =
          confirm("¿Eliminar reserva?");

        if (!confirmDelete) return;

        await deleteReservation(
          btn.dataset.id
        );

        location.reload();
      });
    });

  document
    .querySelectorAll(".cancel-btn")
    .forEach((btn) => {
      btn.addEventListener("click", async () => {

        await cancelReservation(
          btn.dataset.id
        );

        location.reload();
      });
    });
};
