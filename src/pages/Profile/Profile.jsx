
import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">

            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">

                {/* Header */}

                <div className="mb-8 flex items-center gap-5">

                    {/* Avatar */}

                    <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-2xl font-bold text-blue-600">

                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            user.name?.charAt(0).toUpperCase()
                        )}

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            My Profile
                        </h1>

                        <p className="text-gray-500">
                            Manage your account information
                        </p>

                    </div>

                </div>

                {/* Account Information */}

                <div className="space-y-5">

                    {/* Name */}

                    <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                            {user.name}
                        </p>

                    </div>

                    {/* Email */}

                    <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="mt-1 font-semibold text-gray-800">
                            {user.email}
                        </p>

                    </div>

                    {/* Role */}

                    <div className="rounded-xl bg-gray-50 p-4">

                        <p className="text-sm text-gray-500">
                            Account Type
                        </p>

                        <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700">
                            {user.role}
                        </span>

                    </div>

                    {/* Account Created */}

                    {user.createdAt && (
                        <div className="rounded-xl bg-gray-50 p-4">

                            <p className="text-sm text-gray-500">
                                Member Since
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString()}
                            </p>

                        </div>
                    )}

                </div>

                {/* Logout */}

                <button
                    onClick={logout}
                    className="mt-8 w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Profile;
