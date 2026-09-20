import { FaBoxOpen } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const MyOrdersIcon = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive =
        location.pathname === "/orders" ||
        location.pathname.startsWith("/orders/");

    return (
        <button
            type="button"
            onClick={() => navigate("/orders")}
            title="My Orders"
            aria-label="My Orders"
            className={`group flex h-10 w-10 items-center justify-center rounded-md transition-all duration-200 ${
                isActive
                    ? "bg-white text-blue-600"
                    : "text-white hover:bg-white/10"
            }`}
        >
            <FaBoxOpen className="text-base transition-transform duration-200 group-hover:scale-110" />
        </button>
    );
};

export default MyOrdersIcon;