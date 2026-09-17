import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";
import { submitContactMessage } from "../../services/contactService";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSuccess("");
        setError("");
    };

    const validateForm = () => {
        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        if (!name || !email || !subject || !message) {
            return "Please fill in all fields.";
        }

        if (name.length < 2) {
            return "Name must be at least 2 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return "Please enter a valid email address.";
        }

        if (subject.length < 3) {
            return "Subject must be at least 3 characters.";
        }

        if (message.length < 5) {
            return "Message must be at least 5 characters.";
        }

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccess("");
        setError("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const response = await submitContactMessage({
                name: formData.name.trim(),
                email: formData.email.trim(),
                subject: formData.subject.trim(),
                message: formData.message.trim(),
            });

            if (response?.success) {
                setSuccess(
                    "Verification email sent! Please check your inbox and click the verification link to submit your message."
                );

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: "",
                });
            } else {
                setError(
                    response?.message ||
                        "Unable to process your request."
                );
            }
        } catch (err) {
            console.error("Contact form error:", err);

            setError(
                err.response?.data?.message ||
                    "Failed to send verification email. Please try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full min-w-0 overflow-x-hidden bg-slate-50 py-10 sm:py-14 lg:py-20">
            <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link
                        to="/"
                        className="transition hover:text-blue-600"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-blue-600">
                        Contact
                    </span>
                </div>

                {/* Header */}
                <div className="mt-6 max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Need Help?
                    </p>

                    <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                        Get In <span className="text-blue-600">Touch</span>
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                        Have a question, suggestion, or need help with your
                        order? Our support team is here to help.
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">

                    {/* Left Side */}
                    <div className="min-w-0 space-y-5">

                        {/* Contact Information */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                            <h2 className="text-xl font-bold text-gray-900">
                                Contact Information
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Reach out to us through any of the following
                                channels.
                            </p>

                            <div className="mt-6 space-y-5">

                                {/* Email */}
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FaEnvelope />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900">
                                            Email
                                        </p>

                                        <a
                                            href="mailto:support@shopify.com"
                                            className="mt-1 block break-all text-sm text-gray-500 transition hover:text-blue-600"
                                        >
                                            support@shopify.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FaPhone />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Phone
                                        </p>

                                        <a
                                            href="tel:+919999999999"
                                            className="mt-1 block text-sm text-gray-500 transition hover:text-blue-600"
                                        >
                                            +91 99999 99999
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-gray-900">
                                            Address
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-gray-500">
                                            NIT Patna, Bihta Campus, Bihar,
                                            India
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex min-w-0 items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FaClock />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Support Hours
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Monday - Saturday
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            9:00 AM - 6:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Support */}
                        <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-sm sm:p-7">
                            <h2 className="text-xl font-bold">
                                Need help with an order?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-blue-100">
                                You can check your previous orders and track
                                their status from your account.
                            </p>

                            <Link
                                to="/orders"
                                className="mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                            >
                                View My Orders
                            </Link>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm sm:p-7 lg:p-8">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Send Us a Message
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Fill out the form below. We'll send a verification
                            email to confirm that you own the email address.
                        </p>

                        {/* Success */}
                        {success && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium leading-6 text-green-700">
                                ✓ {success}
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-5"
                        >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    maxLength={100}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    maxLength={150}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What can we help you with?"
                                    maxLength={200}
                                    disabled={loading}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here..."
                                    rows={6}
                                    maxLength={2000}
                                    disabled={loading}
                                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading
                                    ? "Sending Verification Email..."
                                    : "Verify Email & Continue"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;