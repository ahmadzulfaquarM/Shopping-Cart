import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Logo = ({ variant = "dark" }) => {
    const isLight = variant === "light";

    return (
        <NavLink
            to="/"
            aria-label="Shopify Home"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
        >
            <FaShoppingCart
                className={`text-3xl ${
                    isLight ? "text-white" : "text-blue-600"
                }`}
            />

            <h1
                className={`text-2xl font-extrabold tracking-tight ${
                    isLight ? "text-white" : "text-blue-600"
                }`}
            >
                Shopify
            </h1>
        </NavLink>
    );
};

export default Logo;