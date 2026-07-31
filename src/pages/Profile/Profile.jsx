import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-sm">

                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    My Profile
                </h1>

                <div className="space-y-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <p className="font-medium text-gray-800">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="font-medium text-gray-800">
                            {user.email}
                        </p>
                    </div>

                </div>

                <button
                    onClick={logout}
                    className="mt-8 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
                >
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Profile;