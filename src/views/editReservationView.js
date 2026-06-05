import Sidebar from "@/components/Sidebar";

export default function editReservationView() {

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 p-6">

        <h1 class="text-2xl font-bold mb-5">
          Editar Reserva
        </h1>

        <form
          id="editReservationForm"
          class="flex flex-col gap-4 bg-white p-5 rounded shadow"
        >

          <input
            name="workspace"
            class="border p-2"
          />

          <input
            type="date"
            name="date"
            class="border p-2"
          />

          <input
            type="time"
            name="startHour"
            class="border p-2"
          />

          <input
            type="time"
            name="endHour"
            class="border p-2"
          />

          <textarea
            name="reason"
            class="border p-2"
          ></textarea>

          <button
            class="bg-blue-600 text-white p-2 rounded"
          >
            Guardar Cambios
          </button>

        </form>

      </main>

    </div>
  `;
}
