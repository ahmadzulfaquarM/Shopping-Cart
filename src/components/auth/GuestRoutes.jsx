import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const GuestRoute = () => {
    const { user } = useAuth();

    return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;