import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaEdit } from "react-icons/fa";

import AddressSection from "../../components/address/AddressSection";
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

            const data = await updateUserProfile(name.trim());

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
        setName(user.name || "");
        setError("");
        setMessage("");
        setIsEditing(false);
    };

    const handleEdit = () => {
        setName(user.name || "");
        setMessage("");
        setError("");
        setIsEditing(true);
    };

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-10 sm:py-12">
            <div className="mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                        Account
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your account information and saved addresses.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-7 sm:px-8">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">

                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/20 text-2xl font-bold text-white shadow-md">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name || "User avatar"}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    user.name?.charAt(0).toUpperCase() || (
                                        <FaUserCircle />
                                    )
                                )}
                            </div>

                            <div className="text-center sm:text-left">
                                <h2 className="text-xl font-bold text-white">
                                    {user.name}
                                </h2>

                                <p className="mt-1 text-sm text-blue-100">
                                    {user.email}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="p-5 sm:p-8">

                        {/* Messages */}
                        {message && (
                            <div
                                role="status"
                                className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
                            >
                                {message}
                            </div>
                        )}

                        {error && (
                            <div
                                role="alert"
                                className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        {!isEditing ? (
                            <>
                                {/* Account Information */}
                                <div>
                                    <div className="mb-5">
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Account Information
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Your basic account details.
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">

                                        <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Name
                                            </p>

                                            <p className="mt-2 break-words font-semibold text-gray-800">
                                                {user.name}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Email
                                            </p>

                                            <p className="mt-2 break-all font-semibold text-gray-800">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Account Type
                                            </p>

                                            <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold capitalize text-blue-700">
                                                {user.role}
                                            </span>
                                        </div>

                                        {user.createdAt && (
                                            <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                    Member Since
                                                </p>

                                                <p className="mt-2 font-semibold text-gray-800">
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                    <button
                                        type="button"
                                        onClick={handleEdit}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <FaEdit />
                                        Edit Profile
                                    </button>

                                    <button
                                        type="button"
                                        onClick={logout}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        <FaSignOutAlt />
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
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Edit Profile
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Update your account name.
                                    </p>
                                </div>

                                <div>
                                    <label
                                        htmlFor="profile-name"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Name
                                    </label>

                                    <input
                                        id="profile-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        autoComplete="name"
                                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="profile-email"
                                        className="mb-2 block text-sm font-semibold text-gray-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="profile-email"
                                        type="email"
                                        value={user.email}
                                        disabled
                                        className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                                    />

                                    <p className="mt-2 text-xs text-gray-400">
                                        Email address cannot be changed.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row">

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loading
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={loading}
                                        className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Address Section */}
                <div className="mt-8">
                    <AddressSection />
                </div>

            </div>
        </section>
    );
};

export default Profile;