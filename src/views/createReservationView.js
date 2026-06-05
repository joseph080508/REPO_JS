import Sidebar from "@/components/Sidebar";

export default function createReservationView() {
  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6">

        <h1 class="text-2xl font-bold mb-5">
          Nueva Reserva
        </h1>

        <form
          id="reservationForm"
          class="flex flex-col gap-4 bg-white p-5 rounded shadow"
        >

          <input
            name="workspace"
            placeholder="Espacio"
            class="border p-2"
            required
          />

          <input
            type="date"
            name="date"
            class="border p-2"
            required
          />

          <input
            type="time"
            name="startHour"
            class="border p-2"
            required
          />

          <input
            type="time"
            name="endHour"
            class="border p-2"
            required
          />

          <textarea
            name="reason"
            placeholder="Motivo"
            class="border p-2"
            required
          ></textarea>

          <button
            class="bg-green-600 text-white p-2 rounded"
          >
            Crear Reserva
          </button>

        </form>

      </main>

    </div>
  `;
}
