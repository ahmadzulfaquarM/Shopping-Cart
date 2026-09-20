import { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            await forgotPassword(email.trim());

            setSubmitted(true);

            toast.success(
                "If the email is registered, a password reset link has been sent."
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to process request"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-9">

                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FaEnvelope />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                            Forgot Password?
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Reset your account password
                        </p>
                    </div>
                </div>

                {!submitted ? (
                    <>
                        <p className="mt-6 text-sm leading-6 text-gray-600 sm:text-base">
                            Enter the email address associated with
                            your account. We'll send you a link to
                            reset your password.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="forgot-email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    id="forgot-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <FaEnvelope className="text-xl" />
                        </div>

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Check Your Email
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            If an account exists with this email,
                            you'll receive a password reset link
                            shortly.
                        </p>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                        <FaArrowLeft />
                        Back to Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;