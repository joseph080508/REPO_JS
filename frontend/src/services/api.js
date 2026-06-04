import { dataClient } from "../utils/https";


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
