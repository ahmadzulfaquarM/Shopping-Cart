import api from "./api";

// Get all addresses
export const getAddresses = async () => {
    const response = await api.get("/addresses");

    return response.data;
};


// Add address
export const addAddress = async (addressData) => {
    const response = await api.post("/addresses", addressData);

    return response.data;
};


// Update address
export const updateAddress = async (id, addressData) => {
    const response = await api.put(
        `/addresses/${id}`,
        addressData
    );

    return response.data;
};


// Delete address
export const deleteAddress = async (id) => {
    const response = await api.delete(
        `/addresses/${id}`
    );

    return response.data;
};