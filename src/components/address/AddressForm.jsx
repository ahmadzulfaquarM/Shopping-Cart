import { useEffect, useState } from "react";

const initialForm = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
};

const AddressForm = ({
    address,
    onSave,
    onCancel,
    loading,
}) => {

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (address) {
            setForm({
                fullName: address.fullName || "",
                phone: address.phone || "",
                address: address.address || "",
                city: address.city || "",
                state: address.state || "",
                postalCode: address.postalCode || "",
                country: address.country || "India",
                isDefault: address.isDefault || false,
            });
        } else {
            setForm(initialForm);
        }

    }, [address]);


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };


    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(form);

    };


    return (
        <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6"
        >

            <h3 className="mb-6 text-xl font-bold text-gray-800">
                {address ? "Edit Address" : "Add New Address"}
            </h3>


            {/* Full Name */}

            <div className="mb-4">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter full name"
                />

            </div>


            {/* Phone */}

            <div className="mb-4">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Phone
                </label>

                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter phone number"
                />

            </div>


            {/* Address */}

            <div className="mb-4">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Address
                </label>

                <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    placeholder="House number, street, area"
                />

            </div>


            {/* City / State */}

            <div className="grid gap-4 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="City"
                    />

                </div>


                <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="State"
                    />

                </div>

            </div>


            {/* Postal / Country */}

            <div className="mt-4 grid gap-4 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Postal Code
                    </label>

                    <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        placeholder="Postal code"
                    />

                </div>


                <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                </div>

            </div>


            {/* Default */}

            <label className="mt-5 flex cursor-pointer items-center gap-3">

                <input
                    type="checkbox"
                    name="isDefault"
                    checked={form.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 accent-blue-600"
                />

                <span className="text-sm font-medium text-gray-700">
                    Set as default address
                </span>

            </label>


            {/* Buttons */}

            <div className="mt-6 flex gap-3">

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading
                        ? "Saving..."
                        : address
                            ? "Update Address"
                            : "Save Address"}
                </button>


                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                    Cancel
                </button>

            </div>

        </form>
    );
};

export default AddressForm;