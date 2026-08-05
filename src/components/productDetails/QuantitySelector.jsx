import { FaMinus, FaPlus } from "react-icons/fa";

const QuantitySelector = ({ quantity, setQuantity, maxStock }) => {
    
    

    const decrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const increase = () => {
        if (maxStock <= 0) return;

        setQuantity((prev) =>
            Math.min(maxStock, prev + 1)
        );
    };

    return (
        <div>

            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Quantity
            </h3>

            <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm">

                <button
                    type="button"
                    onClick={decrease}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <FaMinus size={14} />
                </button>

                <span className="flex h-12 w-16 items-center justify-center border-x border-gray-300 text-lg font-semibold">
                    {quantity}
                </span>

                <button
                    type="button"
                    onClick={increase}
                    disabled={quantity >= maxStock}
                    className="flex h-12 w-12 items-center justify-center transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <FaPlus size={14} />
                </button>

            </div>

            <p className="mt-2 text-sm text-gray-500">
                {maxStock} available
            </p>

        </div>
    );
};

export default QuantitySelector;