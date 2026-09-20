import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const navItems = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Products",
        path: "/products",
    },
    {
        name: "Categories",
        path: "/categories",
        children: [
            "Fashion",
            "Electronics",
            "Beauty",
            "Furniture",
            "Shoes",
        ],
    },
    {
        name: "Contact",
        path: "/contact",
    },
];

const NavLinks = () => {
    return (
        <ul className="flex items-center gap-8">
            {navItems.map((item) => (
                <li
                    key={item.name}
                    className="group relative"
                >
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-1.5 border-b-2 py-1 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
                            }`
                        }
                    >
                        {item.name}

                        {item.children && (
                            <FaChevronDown className="text-[9px] transition-transform duration-200 group-hover:rotate-180" />
                        )}
                    </NavLink>

                    {item.children && (
                        <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-2 rounded-xl border border-gray-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                            {item.children.map((sub) => (
                                <NavLink
                                    key={sub}
                                    to={`/products?category=${encodeURIComponent(
                                        sub
                                    )}`}
                                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 transition-colors duration-150 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    {sub}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;