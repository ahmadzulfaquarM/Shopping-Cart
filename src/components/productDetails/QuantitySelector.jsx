import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);

    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increase = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div>

            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Quantity
            </h3>

            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">

                <button
                    onClick={decrease}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-blue-600 hover:text-white"
                >
                    <FaMinus size={14} />
                </button>

                <span className="flex h-12 w-16 items-center justify-center border-x border-gray-300 text-lg font-semibold">
                    {quantity}
                </span>

                <button
                    onClick={increase}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-blue-600 hover:text-white"
                >
                    <FaPlus size={14} />
                </button>

            </div>

        </div>
    );
};

export default QuantitySelector;