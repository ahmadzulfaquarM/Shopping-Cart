import api from "./api";


// ======================================================
// GET ADMIN DASHBOARD
// ======================================================

export const getDashboardStats = async () => {

    const response = await api.get(
        "/admin/dashboard"
    );

    return response.data;
};


// ======================================================
// GET ALL USERS
// ======================================================

export const getAllUsers = async () => {

    const response = await api.get(
        "/admin/users"
    );

    return response.data;
};


// ======================================================
// GET SINGLE USER
// ======================================================

export const getUserById = async (id) => {

    const response = await api.get(
        `/admin/users/${id}`
    );

    return response.data;
};



// ======================================================
// DELETE USER
// ======================================================

export const deleteUser = async (id) => {

    const response = await api.delete(
        `/admin/users/${id}`
    );

    return response.data;
};



// ======================================================
// BLOCK / UNBLOCK USER
// ======================================================

export const toggleUserBlock = async (id) => {

    const response = await api.put(
        `/admin/users/${id}/block`
    );

    return response.data;
};