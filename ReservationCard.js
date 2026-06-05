import { getSession } from "@/utils";

export default function ReservationCard(reservation) {
  const user = getSession();

  const {
    id,
    workspace,
    date,
    startHour,
    endHour,
    reason,
    status,
  } = reservation;

  return `
    <article class="bg-white p-4 rounded shadow">

      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <p>Fecha: ${date}</p>

      <p>
        Horario:
        ${startHour}
        -
        ${endHour}
      </p>

      <p>Motivo: ${reason}</p>

      <p>Estado: ${status}</p>

      <div class="flex gap-2 mt-4">

        ${
          user.role === "admin"
            ? `
              <button
                class="approve-btn bg-green-600 text-white px-2 py-1 rounded"
                data-id="${id}"
              >
                Aprobar
              </button>

              <button
                class="reject-btn bg-yellow-600 text-white px-2 py-1 rounded"
                data-id="${id}"
              >
                Rechazar
              </button>

              <button
                class="delete-btn bg-red-600 text-white px-2 py-1 rounded"
                data-id="${id}"
              >
                Eliminar
              </button>
            `
            : ""
        }

        ${
          user.role === "user" &&
          status === "pending"
            ? `
              <button
                class="cancel-btn bg-red-500 text-white px-2 py-1 rounded"
                data-id="${id}"
              >
                Cancelar
              </button>
            `
            : ""
        }

      </div>

    </article>
  `;
}
