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


// EDIT
export async function getTicketById(ticketId) {
    try {
        const response = await dataClient.get(`/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo ticket:', error);
        throw error;
    }
}

export async function updateTicket(ticketId, newTicketData) {
    try {
        const ticketResponse = await dataClient.get(`/tickets/${ticketId}`);
        const ticketData = ticketResponse.data;

        ticketData.ticketName = newTicketData.ticketName;
        ticketData.description = newTicketData.description;
        ticketData.priority = newTicketData.priority;
        ticketData.caseType = newTicketData.caseType;
        
        const response = await dataClient.put(`/tickets/${ticketId}`, ticketData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando ticket:', error);
        throw error;
    }
}
// ELIMINAR
export async function deleteTicket(id) {
    try {
        const response = await dataClient.delete(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
} 
