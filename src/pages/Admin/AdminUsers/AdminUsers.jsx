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

import { useNavigate } from "react-router-dom";


const AdminUsers = () => {

    const navigate = useNavigate();


    // ======================================================
    // STATE
    // ======================================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("all");

    const [actionLoading, setActionLoading] = useState(null);


    // ======================================================
    // FETCH USERS
    // ======================================================

    const fetchUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getAllUsers();

            setUsers(
                Array.isArray(data?.users)
                    ? data.users
                    : []
            );

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
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {

        fetchUsers();

    }, []);


    // ======================================================
    // SEARCH + FILTER
    // ======================================================

    const searchText = search
        .trim()
        .toLowerCase();


    const filteredUsers = users.filter((user) => {

        const name = String(
            user?.name || ""
        ).toLowerCase();

        const email = String(
            user?.email || ""
        ).toLowerCase();

        const role = String(
            user?.role || ""
        ).toLowerCase();


        const matchesSearch =
            name.includes(searchText) ||
            email.includes(searchText);


        const matchesRole =
            roleFilter === "all" ||
            role === roleFilter;


        return (
            matchesSearch &&
            matchesRole
        );

    });


    // ======================================================
    // VIEW USER
    // ======================================================

    const handleViewUser = (userId) => {

        if (!userId) {
            return;
        }

        navigate(`/admin/users/${userId}`);

    };


    // ======================================================
    // DELETE USER
    // ======================================================

    const handleDeleteUser = async (user) => {

        // Prevent deleting admin
        if (user?.role === "admin") {

            alert(
                "Admin accounts cannot be deleted."
            );

            return;
        }


        if (!user?._id) {
            return;
        }


        const confirmed = window.confirm(
            `Are you sure you want to delete ${user.name}?`
        );


        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(
                `delete-${user._id}`
            );


            await deleteUser(
                user._id
            );


            // Remove user immediately
            setUsers((previousUsers) =>
                previousUsers.filter(
                    (item) =>
                        item._id !== user._id
                )
            );


        } catch (error) {

            console.error(
                "Delete User Error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        } finally {

            setActionLoading(null);

        }
    };


    // ======================================================
    // BLOCK / UNBLOCK USER
    // ======================================================

    const handleToggleBlock = async (user) => {

        // Prevent blocking admin
        if (user?.role === "admin") {

            alert(
                "Admin accounts cannot be blocked."
            );

            return;
        }


        if (!user?._id) {
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

            setActionLoading(
                `block-${user._id}`
            );


            const data =
                await toggleUserBlock(
                    user._id
                );


            /*
             * Update only this user instead
             * of fetching the complete list again.
             */

            setUsers((previousUsers) =>
                previousUsers.map((item) =>
                    item._id === user._id
                        ? {
                            ...item,
                            isBlocked:
                                data?.user?.isBlocked ??
                                !item.isBlocked,
                        }
                        : item
                )
            );


        } catch (error) {

            console.error(
                "Toggle User Block Error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to update user"
            );

        } finally {

            setActionLoading(null);

        }
    };


    // ======================================================
    // LOADING
    // ======================================================

    if (loading) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>

                    <p className="mt-4 font-medium text-gray-600">
                        Loading users...
                    </p>

                </div>

            </div>

        );
    }


    // ======================================================
    // ERROR
    // ======================================================

    if (error) {

        return (

            <div className="rounded-2xl bg-red-50 p-6">

                <p className="font-semibold text-red-600">
                    {error}
                </p>


                <button
                    onClick={fetchUsers}
                    className="mt-4 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                >
                    Try Again
                </button>

            </div>

        );
    }


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
                                setSearch(
                                    e.target.value
                                )
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
                                setRoleFilter(
                                    e.target.value
                                )
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

                    <table className="w-full min-w-[1000px]">


                        {/* ==================================================
                            TABLE HEADER
                        ================================================== */}

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



                        {/* ==================================================
                            TABLE BODY
                        ================================================== */}

                        <tbody className="divide-y divide-gray-100">


                            {/* ==================================================
                                NO RESULTS
                            ================================================== */}

                            {filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="px-6 py-16 text-center"
                                    >

                                        <FaUser className="mx-auto text-4xl text-gray-300" />


                                        <p className="mt-4 font-semibold text-gray-600">
                                            No users found
                                        </p>


                                        <p className="mt-1 text-sm text-gray-400">
                                            Try changing your search or filter.
                                        </p>

                                    </td>

                                </tr>

                            ) : (


                                /* ==================================================
                                   USERS
                                ================================================== */

                                filteredUsers.map((user) => {

                                    const isAdmin =
                                        user?.role === "admin";

                                    const isBlocked =
                                        Boolean(
                                            user?.isBlocked
                                        );


                                    const deleteLoading =
                                        actionLoading ===
                                        `delete-${user._id}`;


                                    const blockLoading =
                                        actionLoading ===
                                        `block-${user._id}`;


                                    return (

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

                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-600">

                                                        {user?.avatar ? (

                                                            <img
                                                                src={user.avatar}
                                                                alt={
                                                                    user?.name ||
                                                                    "User"
                                                                }
                                                                className="h-full w-full object-cover"
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

                                                    <FaEnvelope className="shrink-0 text-sm text-gray-400" />

                                                    <span className="truncate">
                                                        {user?.email ||
                                                            "No email"}
                                                    </span>

                                                </div>

                                            </td>



                                            {/* ==================================================
                                                ROLE
                                            ================================================== */}

                                            <td className="px-6 py-4">

                                                {isAdmin ? (

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



                                            {/* ==================================================
                                                STATUS
                                            ================================================== */}

                                            <td className="px-6 py-4">

                                                {isAdmin ? (

                                                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                                                        Admin
                                                    </span>

                                                ) : isBlocked ? (

                                                    <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                                                        Blocked
                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                                        Active
                                                    </span>

                                                )}

                                            </td>



                                            {/* ==================================================
                                                ACTIONS
                                            ================================================== */}

                                            <td className="px-6 py-4">

                                                <div className="flex items-center justify-end gap-2">


                                                    {/* VIEW */}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleViewUser(
                                                                user?._id
                                                            )
                                                        }
                                                        title="View User"
                                                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                    >

                                                        <FaEye />

                                                    </button>



                                                    {/* BLOCK / UNBLOCK */}

                                                    {!isAdmin && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleToggleBlock(
                                                                    user
                                                                )
                                                            }
                                                            disabled={
                                                                blockLoading
                                                            }
                                                            title={
                                                                isBlocked
                                                                    ? "Unblock User"
                                                                    : "Block User"
                                                            }
                                                            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                                                isBlocked
                                                                    ? "bg-green-50 text-green-600 hover:bg-green-100"
                                                                    : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                                                            }`}
                                                        >

                                                            {blockLoading ? (

                                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>

                                                            ) : isBlocked ? (

                                                                <FaUnlock />

                                                            ) : (

                                                                <FaBan />

                                                            )}

                                                        </button>

                                                    )}



                                                    {/* DELETE */}

                                                    {!isAdmin && (

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user
                                                                )
                                                            }
                                                            disabled={
                                                                deleteLoading
                                                            }
                                                            title="Delete User"
                                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >

                                                            {deleteLoading ? (

                                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>

                                                            ) : (

                                                                <FaTrash />

                                                            )}

                                                        </button>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    );

                                })

                            )}

                        </tbody>

                    </table>

                </div>

            </div>



            {/* ==================================================
                MOBILE INFORMATION
            ================================================== */}

            <p className="mt-4 text-center text-xs text-gray-400 md:hidden">
                Swipe horizontally to view all user information.
            </p>

        </div>
    );
};


export default AdminUsers;