import AddressSection from "../../components/address/AddressSection";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUserProfile } from "../../services/authService";

const Profile = () => {
    const { user, logout, updateUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    if (!user) {
        return null;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const data = await updateUserProfile(name);

            updateUser(data.user);

            setMessage("Profile updated successfully");
            setIsEditing(false);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setName(user.name);
        setError("");
        setMessage("");
        setIsEditing(false);
    };

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

                {/* Success Message */}

                {message && (
                    <div className="mb-5 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-700">
                        {message}
                    </div>
                )}

                {/* Error Message */}

                {error && (
                    <div className="mb-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                {!isEditing ? (

                    <>
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

                        {/* Actions */}

                        <div className="mt-8 flex gap-4">

                            <button
                                onClick={() => {
                                    setName(user.name);
                                    setMessage("");
                                    setError("");
                                    setIsEditing(true);
                                }}
                                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Edit Profile
                            </button>

                            <button
                                onClick={logout}
                                className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                            >
                                Logout
                            </button>

                        </div>

                    </>

                ) : (

                    /* Edit Form */

                    <form
                        onSubmit={handleUpdate}
                        className="space-y-6"
                    >

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Name
                            </label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter your name"
                            />

                        </div>

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Email cannot be changed.
                            </p>

                        </div>

                        <div className="flex gap-4">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                )}

            </div>

            <div className="mx-auto mt-8 max-w-2xl">

                <AddressSection />

            </div>

        </div>
    );
};

export default Profile;