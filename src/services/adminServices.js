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


// ======================================================
// GET ADMIN ORDERS
// ======================================================

export const getAllOrders = async (params = {}) => {

    const response = await api.get(
        "/admin/orders",
        {
            params,
        }
    );

    return response.data;
};


// ======================================================
// GET ORDER STATISTICS
// ======================================================

export const getOrderStatistics = async () => {

    const response = await api.get(
        "/admin/orders/statistics"
    );

    return response.data;
};


// ======================================================
// UPDATE ORDER STATUS
// ======================================================

export const updateOrderStatus = async (
    id,
    status
) => {

    const response = await api.put(
        `/admin/orders/${id}/status`,
        {
            status,
        }
    );

    return response.data;
};


// ======================================================
// GET ADMIN ORDER BY ID
// ======================================================

export const getAdminOrderById = async (
    id
) => {

    const response = await api.get(
        `/admin/orders/${id}`
    );

    return response.data;
};