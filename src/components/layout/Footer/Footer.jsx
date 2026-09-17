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
        <footer className="bg-gray-950 text-gray-300">

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">

                {/* Main Footer */}
                <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">

                    {/* Brand */}
                    <div>

                        <Link to="/" className="inline-block">
                            <h2 className="text-3xl font-extrabold text-white">
                                Shop
                                <span className="text-blue-600">ify</span>
                            </h2>
                        </Link>

                        <p className="mt-5 text-sm leading-6 text-gray-400 sm:mt-6 sm:text-base sm:leading-8">
                            Premium shopping experience with fashion,
                            electronics, beauty, furniture, footwear
                            and much more.
                        </p>

                        {/* Social Media */}
                        <div className="mt-6 flex gap-3 sm:mt-8 sm:gap-4">

                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 hover:bg-blue-600 hover:text-white sm:h-11 sm:w-11"
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-lg font-bold text-white sm:text-xl">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

                            {quickLinks.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        to={item.path}
                                        className="text-sm transition duration-300 hover:text-blue-400 sm:text-base"
                                    >
                                        {item.name}
                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Categories */}
                    <div>

                        <h3 className="text-lg font-bold text-white sm:text-xl">
                            Categories
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

                            {categories.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        to={item.path}
                                        className="text-sm transition duration-300 hover:text-blue-400 sm:text-base"
                                    >
                                        {item.name}
                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* Customer Care */}
                    <div>

                        <h3 className="text-lg font-bold text-white sm:text-xl">
                            Customer Care
                        </h3>

                        <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

                            {customerCare.map((item) => (
                                <li key={item.name}>

                                    <Link
                                        to={item.path}
                                        className="text-sm transition duration-300 hover:text-blue-400 sm:text-base"
                                    >
                                        {item.name}
                                    </Link>

                                </li>
                            ))}

                        </ul>

                    </div>

                </div>

                {/* Divider */}
                <div className="my-9 border-t border-gray-800 sm:my-12"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

                    <p className="text-xs text-gray-500 sm:text-sm">
                        © 2026 Shopify. All Rights Reserved.
                    </p>

                    {/* Payment Methods */}
                    <div className="flex items-center gap-4 text-3xl text-gray-400 sm:gap-5 sm:text-4xl">

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