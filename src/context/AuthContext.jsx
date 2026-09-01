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


    // ======================================================
    // VERIFY USER ON PAGE LOAD
    // ======================================================

    useEffect(() => {

        const verifyUser = async () => {

            const token = getToken();


            // No token → user is not logged in
            if (!token) {

                setUser(null);
                setLoading(false);

                return;
            }


            try {

                const data = await getUserProfile();


                // Backend successfully verified JWT
                setUser(data.user);


                // Keep latest user data
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


                // Invalid/expired token
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


    

    const updateUser = (updatedUser) => {

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

};


export const useAuth = () => {

    return useContext(AuthContext);

};