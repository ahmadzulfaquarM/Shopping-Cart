import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyOrdersIcon = () => {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate("/orders")}
            className="relative flex items-center justify-center text-gray-700 transition hover:text-blue-600"
            title="My Orders"
        >
            <FaBoxOpen className="text-xl" />
        </button>
    );
};

export default MyOrdersIcon;