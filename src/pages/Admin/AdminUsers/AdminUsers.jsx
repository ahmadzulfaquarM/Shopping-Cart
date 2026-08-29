import React, { useEffect, useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaUserShield,
    FaEye,
    FaTrash,
    FaBan,
    FaUnlock,
} from "react-icons/fa";

import {
    getAllUsers,
    deleteUser,
    toggleUserBlock,
} from "../../../services/adminServices";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Search
    const [search, setSearch] = useState("");

    // Role filter
    const [roleFilter, setRoleFilter] = useState("all");


    // ======================================================
    // FETCH USERS
    // ======================================================

    const fetchUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllUsers();

            setUsers(data.users || []);

        } catch (error) {

            console.error(
                "Admin Users Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load users"
            );

        } finally {

            setLoading(false);

        }
    };


    // ======================================================
    // LOAD USERS
    // ======================================================

    useEffect(() => {

        fetchUsers();

    }, []);


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="font-medium text-gray-600">
                    Loading users...
                </p>

            </div>
        );
    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (
            <div className="rounded-2xl bg-red-50 p-6 text-red-600">

                <p className="font-semibold">
                    {error}
                </p>

            </div>
        );
    }


    // ======================================================
    // SEARCH + ROLE FILTER
    // ======================================================

    const filteredUsers = users.filter((user) => {

        // Safely convert values to strings
        const name = String(
            user?.name || ""
        ).toLowerCase();

        const email = String(
            user?.email || ""
        ).toLowerCase();

        const role = String(
            user?.role || ""
        ).toLowerCase();

        const searchText = search
            .trim()
            .toLowerCase();


        // Search by name OR email

        const matchesSearch =
            name.includes(searchText) ||
            email.includes(searchText);


        // Role filter

        const matchesRole =
            roleFilter === "all" ||
            role === roleFilter;


        return (
            matchesSearch &&
            matchesRole
        );
    });


    // ======================================================
    // DELETE USER
    // ======================================================

    const handleDeleteUser = async (user) => {

        if (user.role === "admin") {

            alert("Admin accounts cannot be deleted.");

            return;
        }


        const confirmed = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );


        if (!confirmed) {
            return;
        }


        try {

            await deleteUser(user._id);

            await fetchUsers();

        } catch (error) {

            console.error(
                "Delete User Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );
        }
    };



    // ======================================================
    // BLOCK / UNBLOCK
    // ======================================================

    const handleToggleBlock = async (user) => {

        if (user.role === "admin") {

            alert("Admin accounts cannot be blocked.");

            return;
        }


        const action = user.isBlocked
            ? "unblock"
            : "block";


        const confirmed = window.confirm(
            `Are you sure you want to ${action} ${user.name}?`
        );


        if (!confirmed) {
            return;
        }


        try {

            await toggleUserBlock(
                user._id
            );

            await fetchUsers();

        } catch (error) {

            console.error(
                "Toggle User Block Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to update user"
            );
        }
    };

    // ======================================================
    // RETURN
    // ======================================================

    return (

        <div>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-900">
                    Users
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage registered users
                </p>

            </div>


            {/* ==================================================
                SEARCH & FILTER
            ================================================== */}

            <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

                <div className="grid gap-4 md:grid-cols-2">


                    {/* SEARCH */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Search Users
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search by name or email..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>


                    {/* ROLE FILTER */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Filter by Role
                        </label>

                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >

                            <option value="all">
                                All Users
                            </option>

                            <option value="user">
                                Users
                            </option>

                            <option value="admin">
                                Admins
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* ==================================================
                RESULT COUNT
            ================================================== */}

            <div className="mb-4">

                <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold text-gray-900">
                        {filteredUsers.length}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-900">
                        {users.length}
                    </span>

                    {" "}users

                </p>

            </div>


            {/* ==================================================
                USER TABLE
            ================================================== */}

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">


                        {/* TABLE HEADER */}

                        <thead className="border-b border-gray-200 bg-gray-50">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Role
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Joined
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        {/* TABLE BODY */}

                        <tbody className="divide-y divide-gray-100">


                            {/* NO RESULTS */}

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center"
                                    >

                                        <FaUser
                                            className="mx-auto text-3xl text-gray-300"
                                        />

                                        <p className="mt-3 font-medium text-gray-600">
                                            No users found
                                        </p>

                                        <p className="mt-1 text-sm text-gray-400">
                                            Try changing your search or filter.
                                        </p>

                                    </td>

                                </tr>

                            ) : (

                                /* USERS */

                                filteredUsers.map((user) => (

                                    <tr
                                        key={user?._id}
                                        className="transition hover:bg-gray-50"
                                    >


                                        {/* ==================================================
                                            USER
                                        ================================================== */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-4">


                                                {/* AVATAR */}

                                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">

                                                    {user?.avatar ? (

                                                        <img
                                                            src={user.avatar}
                                                            alt={user?.name || "User"}
                                                            className="h-11 w-11 rounded-full object-cover"
                                                        />

                                                    ) : (

                                                        <FaUser />

                                                    )}

                                                </div>


                                                {/* NAME */}

                                                <div>

                                                    <p className="font-semibold text-gray-900">

                                                        {user?.name ||
                                                            "Unknown User"}

                                                    </p>

                                                    <p className="text-sm text-gray-500">

                                                        {user?._id
                                                            ? `#${user._id.slice(-8)}`
                                                            : "No ID"}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>


                                        {/* ==================================================
                                            EMAIL
                                        ================================================== */}

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-2 text-gray-600">

                                                <FaEnvelope className="text-sm text-gray-400" />

                                                {user?.email ||
                                                    "No email"}

                                            </div>

                                        </td>


                                        {/* ==================================================
                                            ROLE
                                        ================================================== */}

                                        <td className="px-6 py-4">

                                            {user?.role === "admin" ? (

                                                <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">

                                                    <FaUserShield />

                                                    Admin

                                                </span>

                                            ) : (

                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

                                                    User

                                                </span>

                                            )}

                                        </td>


                                        {/* ==================================================
                                            JOINED
                                        ================================================== */}

                                        <td className="px-6 py-4 text-sm text-gray-600">

                                            {user?.createdAt
                                                ? new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()
                                                : "N/A"}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};


export default AdminUsers;