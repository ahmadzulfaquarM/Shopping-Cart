import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
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

            await forgotPassword(email);

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
        <section className="min-h-screen bg-slate-50 px-4 py-16">

            <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FaEnvelope />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Forgot Password?
                        </h1>

                        <p className="text-sm text-gray-500">
                            Reset your account password
                        </p>
                    </div>

                </div>

                {!submitted ? (
                    <>

                        <p className="mb-6 text-gray-600">
                            Enter the email address associated with your
                            account. We'll send you a link to reset your
                            password.
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="mb-2 block font-medium text-gray-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"
                                />

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send Reset Link"}
                            </button>

                        </form>

                    </>
                ) : (
                    <div className="rounded-xl bg-green-50 p-5 text-center">

                        <FaEnvelope className="mx-auto text-4xl text-green-500" />

                        <h2 className="mt-4 text-lg font-bold text-gray-900">
                            Check Your Email
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            If an account exists with this email,
                            you'll receive a password reset link shortly.
                        </p>

                    </div>
                )}

                <div className="mt-8 text-center">

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
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