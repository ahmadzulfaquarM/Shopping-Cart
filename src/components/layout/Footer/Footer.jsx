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
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
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
    { name: "Contact Us", path: "/contact" },
    { name: "My Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
];

const socialLinks = [
    {
        name: "Facebook",
        icon: FaFacebookF,
        url: "https://www.facebook.com/",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        url: "https://www.instagram.com/",
    },
    {
        name: "Twitter",
        icon: FaTwitter,
        url: "https://twitter.com/",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedinIn,
        url: "https://www.linkedin.com/",
    },
];

const Footer = () => {
    return (
        <footer className="border-t border-gray-900 bg-gray-950 text-gray-300">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">

                {/* ================= MAIN FOOTER ================= */}
                <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-4 lg:gap-12">

                    {/* ================= BRAND ================= */}
                    <div>
                        <Link
                            to="/"
                            aria-label="Shopify Home"
                            className="group inline-block"
                        >
                            <h2 className="text-3xl font-extrabold tracking-tight text-white">
                                Shop
                                <span className="text-blue-500 transition-colors duration-200 group-hover:text-blue-400">
                                    ify
                                </span>
                            </h2>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400 sm:mt-6 sm:text-base sm:leading-7">
                            Premium shopping experience with fashion,
                            electronics, beauty, furniture, footwear
                            and much more.
                        </p>

                        {/* Social Media */}
                        <div className="mt-6 flex items-center gap-3 sm:mt-7">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        title={social.name}
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-gray-800
                                            bg-gray-900
                                            text-gray-400
                                            transition-all
                                            duration-200
                                            hover:-translate-y-0.5
                                            hover:border-blue-600
                                            hover:bg-blue-600
                                            hover:text-white
                                            focus:outline-none
                                            focus:ring-2
                                            focus:ring-blue-500
                                            focus:ring-offset-2
                                            focus:ring-offset-gray-950
                                            sm:h-11
                                            sm:w-11
                                        "
                                    >
                                        <Icon className="text-sm sm:text-base" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= QUICK LINKS ================= */}
                    <div>
                        <h3 className="text-base font-bold text-white sm:text-lg">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="
                                            inline-flex
                                            text-sm
                                            text-gray-400
                                            transition-colors
                                            duration-200
                                            hover:text-blue-400
                                            focus:outline-none
                                            focus:text-blue-400
                                            sm:text-[15px]
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================= CATEGORIES ================= */}
                    <div>
                        <h3 className="text-base font-bold text-white sm:text-lg">
                            Categories
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                            {categories.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="
                                            inline-flex
                                            text-sm
                                            text-gray-400
                                            transition-colors
                                            duration-200
                                            hover:text-blue-400
                                            focus:outline-none
                                            focus:text-blue-400
                                            sm:text-[15px]
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ================= CUSTOMER CARE ================= */}
                    <div>
                        <h3 className="text-base font-bold text-white sm:text-lg">
                            Customer Care
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-3.5">
                            {customerCare.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className="
                                            inline-flex
                                            text-sm
                                            text-gray-400
                                            transition-colors
                                            duration-200
                                            hover:text-blue-400
                                            focus:outline-none
                                            focus:text-blue-400
                                            sm:text-[15px]
                                        "
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ================= DIVIDER ================= */}
                <div className="my-9 border-t border-gray-800 sm:my-12" />

                {/* ================= BOTTOM FOOTER ================= */}
                <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

                    <p className="text-xs text-gray-500 sm:text-sm">
                        © 2026 Shopify. All Rights Reserved.
                    </p>

                    {/* Payment Methods */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            text-2xl
                            text-gray-500
                            sm:gap-4
                            sm:text-3xl
                        "
                        aria-label="Accepted payment methods"
                    >
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