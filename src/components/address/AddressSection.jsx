import { useEffect, useState } from "react";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} from "../../services/addressService";

import AddressForm from "./AddressForm";
import AddressCard from "./AddressCard";

const AddressSection = () => {

    const [addresses, setAddresses] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingAddress, setEditingAddress] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // Load addresses

    const loadAddresses = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAddresses();

            setAddresses(data.addresses);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load addresses"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadAddresses();

    }, []);


    // Save address

    const handleSave = async (formData) => {

        try {

            setSaving(true);
            setError("");
            setMessage("");

            if (editingAddress) {

                const data = await updateAddress(
                    editingAddress._id,
                    formData
                );

                setAddresses((prev) =>
                    prev.map((address) =>
                        address._id === data.address._id
                            ? data.address
                            : formData.isDefault
                                ? {
                                    ...address,
                                    isDefault: false,
                                }
                                : address
                    )
                );

                setMessage(
                    "Address updated successfully"
                );

            } else {

                const data = await addAddress(
                    formData
                );

                if (formData.isDefault) {

                    setAddresses((prev) => [
                        ...prev.map((address) => ({
                            ...address,
                            isDefault: false,
                        })),
                        data.address,
                    ]);

                } else {

                    setAddresses((prev) => [
                        data.address,
                        ...prev,
                    ]);

                }

                setMessage(
                    "Address added successfully"
                );

            }

            setShowForm(false);
            setEditingAddress(null);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to save address"
            );

        } finally {

            setSaving(false);

        }

    };


    // Edit

    const handleEdit = (address) => {

        setEditingAddress(address);

        setShowForm(true);

        setError("");
        setMessage("");

    };


    // Delete

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this address?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setMessage("");

            await deleteAddress(id);

            setAddresses((prev) =>
                prev.filter(
                    (address) => address._id !== id
                )
            );

            setMessage(
                "Address deleted successfully"
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to delete address"
            );

        }

    };


    // Cancel form

    const handleCancel = () => {

        setShowForm(false);

        setEditingAddress(null);

        setError("");

    };


    return (
        <section className="mt-10">

            {/* Header */}

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Saved Addresses
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your delivery addresses
                    </p>

                </div>


                {!showForm && (
                    <button
                        onClick={() => {
                            setEditingAddress(null);
                            setShowForm(true);
                            setMessage("");
                            setError("");
                        }}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Add Address
                    </button>
                )}

            </div>


            {/* Messages */}

            {message && (
                <div className="mt-5 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-700">
                    {message}
                </div>
            )}


            {error && (
                <div className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}


            {/* Form */}

            {showForm && (
                <AddressForm
                    address={editingAddress}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    loading={saving}
                />
            )}


            {/* Loading */}

            {loading ? (

                <div className="mt-6 rounded-2xl bg-gray-50 p-8 text-center text-gray-500">
                    Loading addresses...
                </div>

            ) : addresses.length === 0 && !showForm ? (

                <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-8 text-center">

                    <p className="font-medium text-gray-700">
                        No saved addresses
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Add an address for faster checkout.
                    </p>

                </div>

            ) : (

                <div className="mt-6 grid gap-5 md:grid-cols-2">

                    {addresses.map((address) => (

                        <AddressCard
                            key={address._id}
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}

        </section>
    );
};

export default AddressSection;