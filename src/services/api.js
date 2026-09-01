import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});


// request interceptor

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// response interceptor
api.interceptors.response.use(

    // Successful response
    (response) => {
        return response;
    },

    // Error response
    (error) => {

        if (error.response?.status === 401) {

            // Remove invalid/expired authentication
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Redirect to login
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api;