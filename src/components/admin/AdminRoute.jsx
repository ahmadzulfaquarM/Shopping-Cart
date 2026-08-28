import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {

    const { user, loading } = useAuth();

    // Wait until authentication is verified
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-gray-600">
                    Checking admin access...
                </p>
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // Admin
    return <Outlet />;
};

export default AdminRoute;