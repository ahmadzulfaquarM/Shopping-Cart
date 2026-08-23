import api from "./api";

export const createOrder = async (
    items,
    addressId,
    paymentMethod
) => {
    const response = await api.post("/orders", {
        items,
        addressId,
        paymentMethod,
    });

    return response.data;
};