import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyOrdersIcon = () => {

    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate("/orders")}
            title="My Orders"
            aria-label="My Orders"
            className="group flex h-9 w-9 items-center justify-center rounded-sm text-white transition hover:bg-white/10"
        >
            <FaBoxOpen className="text-base transition group-hover:scale-105" />
        </button>
    );
};

export default MyOrdersIcon;
