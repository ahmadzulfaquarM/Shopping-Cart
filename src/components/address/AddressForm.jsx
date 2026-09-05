import { useEffect, useState } from "react";
import { FaLocationArrow, FaSpinner } from "react-icons/fa";

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

// Free reverse-geocoding, no API key needed. Swap for Google Maps
// Geocoding API if you already have a key set up elsewhere in the project.
const reverseGeocode = async (lat, lon) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Could not resolve address from location");
    }

    return res.json();
};

const AddressForm = ({
    address,
    onSave,
    onCancel,
    loading,
}) => {

    const [form, setForm] = useState(initialForm);

    const [locating, setLocating] = useState(false);
    const [locationError, setLocationError] = useState("");

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


    const handleUseCurrentLocation = () => {

        setLocationError("");

        if (!navigator.geolocation) {
            setLocationError("Location access isn't supported by your browser");
            return;
        }

        setLocating(true);

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const { latitude, longitude } = position.coords;

                    const data = await reverseGeocode(latitude, longitude);

                    const addr = data.address || {};

                    setForm((prev) => ({
                        ...prev,
                        address:
                            [addr.house_number, addr.road, addr.suburb]
                                .filter(Boolean)
                                .join(", ") || prev.address,
                        city:
                            addr.city ||
                            addr.town ||
                            addr.village ||
                            addr.county ||
                            prev.city,
                        state: addr.state || prev.state,
                        postalCode: addr.postcode || prev.postalCode,
                        country: addr.country || prev.country,
                    }));

                } catch (err) {

                    setLocationError(
                        "Couldn't fetch your address, please enter it manually"
                    );

                } finally {

                    setLocating(false);

                }

            },

            (err) => {

                setLocating(false);

                if (err.code === err.PERMISSION_DENIED) {
                    setLocationError(
                        "Location permission denied — please enter your address manually"
                    );
                } else {
                    setLocationError("Couldn't detect your location");
                }

            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );

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

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <h3 className="text-xl font-bold text-gray-800">
                    {address ? "Edit Address" : "Add New Address"}
                </h3>

                <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={locating}
                    className="flex items-center justify-center gap-2 self-start rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {locating ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Detecting location...
                        </>
                    ) : (
                        <>
                            <FaLocationArrow />
                            Use Current Location
                        </>
                    )}
                </button>

            </div>

            {locationError && (
                <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {locationError}
                </div>
            )}


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
