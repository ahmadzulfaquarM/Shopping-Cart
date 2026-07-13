import { NavLink } from "react-router-dom";

const NavLinks = () => {
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Categories", path: "/categories" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
                <li key={item.name}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            isActive
                                ? "border-b-2 border-blue-600 pb-1 font-semibold text-blue-600 transition-all duration-300"
                                : "border-b-2 border-transparent pb-1 text-gray-700 transition-all duration-300 hover:border-blue-600 hover:text-blue-600"
                        }
                    >
                        {item.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;