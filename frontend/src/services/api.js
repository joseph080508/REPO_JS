import { authClient, dataClient } from "../utils/https";


export async function getTickets() {
    try {
        const response = await dataClient.get('/tickets');
        return response.data|| [];

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTicketsById(id) {
    try {
        const response = await dataClient.get(`/tickets?UserId=${id}`);
        return response.data|| [];

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function postTicket(ticket) {
      try {
        const response = await dataClient.post(`/tickets`,ticket);
     } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getUsuarios(rol) {
    try {
        const response = await authClient.get(`/users?role=${rol}`);
        return response.data|| [];

    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function updateTicketTech(ticketId, techId) {
    try {
        const ticketResponse = await dataClient.get(`/tickets/${ticketId}`);
        const ticketData = ticketResponse.data;
        ticketData.Technician = techId;
        
        const response = await dataClient.put(`/tickets/${ticketId}`, ticketData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando técnico:', error);
        throw error;
    }
}