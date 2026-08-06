import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getUser,
    logoutUser,
    getToken,
} from "../utils/auth";

import { getUserProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getUser());

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const verifyUser = async () => {

            const token = getToken();

            // No token → no authenticated user
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {

                const data = await getUserProfile();

                setUser(data.user);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

            } catch (error) {

                console.error(
                    "Authentication verification failed:",
                    error.response?.data?.message ||
                    error.message
                );

                logoutUser();
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        verifyUser();

    }, []);

    const login = (userData) => {

        setUser(userData);

    };

    const logout = () => {

        logoutUser();

        setUser(null);

    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    return useContext(AuthContext);

};

