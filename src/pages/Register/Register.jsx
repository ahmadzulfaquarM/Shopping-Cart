import { useState } from "react";
import {
    FaEye,
    FaEyeSlash,
    FaEnvelopeCircleCheck,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [registrationComplete, setRegistrationComplete] =
        useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword,
        } = formData;

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser(
                name.trim(),
                email.trim(),
                password
            );

            setRegisteredEmail(
                data.user?.email ||
                    email.trim().toLowerCase()
            );

            setRegistrationComplete(true);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            toast.success("Verification email sent!");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    if (registrationComplete) {
        return (
            <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-xl sm:p-10">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FaEnvelopeCircleCheck className="text-3xl" />
                    </div>

                    <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Check Your Email
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base">
                        We have sent a verification link to:
                    </p>

                    <p className="mt-2 break-all font-bold text-gray-900">
                        {registeredEmail}
                    </p>

                    <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                        Please open your email and click the
                        verification link to activate your account.
                    </div>

                    <p className="mt-5 text-sm leading-6 text-gray-500">
                        After verification, you will be
                        automatically taken to the home page.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setRegistrationComplete(false)
                        }
                        className="mt-7 w-full rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
                    >
                        Register Another Account
                    </button>

                    <p className="mt-6 text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-14 lg:py-16">
            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-9">

                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FaEnvelopeCircleCheck className="text-2xl" />
                    </div>

                    <h1 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Register to start shopping.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="register-name"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Name
                        </label>

                        <input
                            id="register-name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoComplete="name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="register-email"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="register-password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="register-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="register-confirm-password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="register-confirm-password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            autoComplete="new-password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                <p className="mt-7 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;