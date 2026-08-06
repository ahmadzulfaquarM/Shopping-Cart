import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { saveAuth } from "../../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        try {
            setLoading(true);

            const data = await loginUser(email, password);

            saveAuth(data.token, data.user);
            login(data.user);

            toast.success("Login successful!");

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-16">

            <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">

                {/* LEFT SIDE */}

                <div className="hidden bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white md:flex md:flex-col md:justify-center">

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
                        Welcome Back
                    </p>

                    <h1 className="mt-5 text-5xl font-bold leading-tight">
                        Continue Your
                        <span className="block text-blue-200">
                            Shopping Journey
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                        Login to access your account, manage your
                        wishlist, track orders and continue shopping.
                    </p>

                    <div className="mt-10 flex gap-3">
                        <span className="h-2 w-12 rounded-full bg-white" />
                        <span className="h-2 w-6 rounded-full bg-blue-300" />
                        <span className="h-2 w-6 rounded-full bg-blue-300" />
                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="p-8 sm:p-12">

                    <div className="mx-auto max-w-md">

                        {/* Header */}

                        <div className="text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                <FaLock className="text-2xl" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Login to your account to continue
                            </p>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label className="text-sm font-semibold text-gray-700">
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot Password?
                                    </Link>

                                </div>

                                <div className="relative">

                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-blue-600"
                                    >
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                        </form>

                        {/* Register */}

                        <div className="mt-8 text-center">

                            <p className="text-gray-500">
                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Create Account
                                </Link>

                            </p>

                        </div>

                        {/* Security */}

                        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
                            <FaLock />
                            <span>
                                Your information is securely protected
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Login;