import { http } from "@/api/http";

export const getReservations = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);

export const updateReservation = (id, data) =>
  http.patch(`/reservations/${id}`, data);

export const deleteReservation = (id) =>
  http.delete(`/reservations/${id}`);

export const approveReservation = (id) =>
  http.patch(`/reservations/${id}`, {
    status: "approved",
  });

export const rejectReservation = (id) =>
  http.patch(`/reservations/${id}`, {
    status: "rejected",
  });

export const cancelReservation = (id) =>
  http.patch(`/reservations/${id}`, {
    status: "cancelled",
  });
