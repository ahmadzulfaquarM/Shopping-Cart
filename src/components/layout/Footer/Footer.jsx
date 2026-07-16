import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
    FaStripe,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "#" },
    { name: "Contact", path: "#" },
    { name: "Login", path: "/login" },
];

const categories = [
    { name: "Fashion", path: "/products?category=fashion" },
    { name: "Electronics", path: "/products?category=electronics" },
    { name: "Beauty", path: "/products?category=beauty" },
    { name: "Furniture", path: "/products?category=furniture" },
    { name: "Shoes", path: "/products?category=shoes" },
];

const customerCare = [
    { name: "Contact Us", path: "#" },
    { name: "FAQs", path: "#" },
    { name: "Shipping", path: "#" },
    { name: "Returns", path: "#" },
    { name: "Privacy Policy", path: "#" },
];

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">

                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}

                    <div>

                        <h2 className="text-3xl font-extrabold text-white">
                            Shop
                            <span className="text-blue-600">ify</span>
                        </h2>

                        <p className="mt-6 leading-8 text-gray-400">
                            Premium shopping experience with fashion,
                            electronics, beauty, furniture, footwear
                            and much more.
                        </p>

                        <div className="mt-8 flex gap-4">

                            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                                (Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:bg-blue-600"
                                    >
                                        <Icon />
                                    </a>
                                )
                            )}

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div>

                        <h3 className="text-xl font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {quickLinks.map((item) => (
                                <li key={item.name}>

                                    {item.path === "#" ? (
                                        <span className="cursor-not-allowed text-gray-500">
                                            {item.name}
                                        </span>
                                    ) : (
                                        <Link
                                            to={item.path}
                                            className="transition duration-300 hover:text-blue-400"
                                        >
                                            {item.name}
                                        </Link>
                                    )}

                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Categories */}

                    <div>

                        <h3 className="text-xl font-bold text-white">
                            Categories
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {categories.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        to={item.path}
                                        className="transition duration-300 hover:text-blue-400"
                                    >
                                        {item.name}
                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Customer Care */}

                    <div>

                        <h3 className="text-xl font-bold text-white">
                            Customer Care
                        </h3>

                        <ul className="mt-6 space-y-4">

                            {customerCare.map((item) => (
                                <li key={item.name}>

                                    <span className="cursor-not-allowed text-gray-500">
                                        {item.name}
                                    </span>

                                </li>
                            ))}

                        </ul>

                    </div>

                </div>

                <div className="my-12 border-t border-gray-800"></div>

                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                    <p className="text-gray-500">
                        © 2026 Shopify. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-5 text-4xl text-gray-400">

                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcPaypal />
                        <FaStripe />

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;