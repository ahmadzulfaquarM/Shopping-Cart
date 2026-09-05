import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

// Add/adjust subcategories to match what your backend actually serves.
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
            "Mobiles",
            "Electronics",
            "Beauty",
            "Home & Furniture",
            "Appliances",
            "Sports",
        ],
    },
    {
        name: "Contact",
        path: "/contact",
    },
];

const NavLinks = () => {

    const [openMenu, setOpenMenu] = useState(null);

    return (
        <ul className="flex items-center gap-8">
            {navItems.map((item) => (
                <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                        item.children && setOpenMenu(item.name)
                    }
                    onMouseLeave={() =>
                        item.children && setOpenMenu(null)
                    }
                >
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-1 border-b-2 pb-1 text-sm font-medium transition-all duration-200 ${
                                isActive
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-700 hover:border-blue-600 hover:text-blue-600"
                            }`
                        }
                    >
                        {item.name}

                        {item.children && (
                            <FaChevronDown
                                className={`text-[10px] transition-transform ${
                                    openMenu === item.name ? "rotate-180" : ""
                                }`}
                            />
                        )}
                    </NavLink>

                    {/* Mega menu */}

                    {item.children && openMenu === item.name && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-md border border-gray-100 bg-white py-2 shadow-lg">
                            {item.children.map((sub) => (
                                <NavLink
                                    key={sub}
                                    to={`/products?category=${encodeURIComponent(sub)}`}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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
