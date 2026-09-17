import axios from "axios";

const API_URL = "http://localhost:5000/api/contact";

/*
|--------------------------------------------------------------------------
| Submit Contact Message
|--------------------------------------------------------------------------
*/

export const submitContactMessage = async (contactData) => {
    const response = await axios.post(
        API_URL,
        contactData
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Verify Contact Email
|--------------------------------------------------------------------------
*/

export const verifyContactEmail = async (token) => {
    const response = await axios.get(
        `${API_URL}/verify/${token}`
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Admin Contact Messages
|--------------------------------------------------------------------------
*/

export const getAdminContactMessages = async ({
    page = 1,
    limit = 10,
    status = "",
    search = "",
} = {}) => {
    const token =
        localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/admin`,
        {
            params: {
                page,
                limit,
                status,
                search,
            },

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Single Admin Contact Message
|--------------------------------------------------------------------------
*/

export const getAdminContactMessage = async (
    id
) => {
    const token =
        localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/admin/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Contact Status
|--------------------------------------------------------------------------
*/

export const updateContactStatus = async (
    id,
    status
) => {
    const token =
        localStorage.getItem("token");

    const response = await axios.patch(
        `${API_URL}/admin/${id}/status`,
        {
            status,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Contact Message
|--------------------------------------------------------------------------
*/

export const deleteContactMessage = async (
    id
) => {
    const token =
        localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/admin/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Reply To Contact Message
|--------------------------------------------------------------------------
*/

export const replyToContactMessage = async (
    id,
    replyMessage
) => {
    const token =
        localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/admin/${id}/reply`,
        {
            replyMessage,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};