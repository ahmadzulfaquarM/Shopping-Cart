import api from "./api";

export const getOrderChatMessages = async (orderId) => {
    const { data } = await api.get(`/orders/${orderId}/chat`);
    return data;
};

export const sendOrderChatMessage = async (orderId, text) => {
    const { data } = await api.post(`/orders/${orderId}/chat`, { text });
    return data;
};
