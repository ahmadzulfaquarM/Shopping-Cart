import api from "./api";

export const registerUser = async (name, email, password) => {
    const response = await api.post("/auth/register", {
        name,
        email,
        password,
    });

    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });

    return response.data;
};

export const getUserProfile = async () => {
    const response = await api.get("/auth/profile");

    return response.data;
};