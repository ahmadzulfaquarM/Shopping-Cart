import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

const AddressCard = ({
    address,
    onEdit,
    onDelete,
}) => {

    return (
        <div
            className={`relative rounded-2xl border bg-white p-6 transition ${
                address.isDefault
                    ? "border-blue-600 shadow-md"
                    : "border-gray-200 shadow-sm"
            }`}
        >

            {/* Default Badge */}

            {address.isDefault && (
                <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    <FaCheckCircle />

                    Default

                </div>
            )}


            {/* Name */}

            <h3 className="text-lg font-bold text-gray-800">
                {address.fullName}
            </h3>


            {/* Phone */}

            <p className="mt-2 text-sm text-gray-600">
                {address.phone}
            </p>


            {/* Address */}

            <p className="mt-3 leading-6 text-gray-600">
                {address.address}
                <br />
                {address.city}, {address.state}
                <br />
                {address.postalCode}, {address.country}
            </p>


            {/* Actions */}

            <div className="mt-5 flex gap-3">

                <button
                    onClick={() => onEdit(address)}
                    className="flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                    <FaEdit />
                    Edit
                </button>


                <button
                    onClick={() => onDelete(address._id)}
                    className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                    <FaTrash />
                    Delete
                </button>

            </div>

        </div>
    );
};

export default AddressCard;