import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
    FaEnvelope,
} from "react-icons/fa";
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

        if (!email.trim() || !password) {
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
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center bg-slate-50 px-4 py-10 sm:py-14 lg:py-16">
            <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl md:grid-cols-2">

                {/* Left */}
                <div className="hidden bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white md:flex md:flex-col md:justify-center lg:p-12">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                        Welcome Back
                    </p>

                    <h1 className="mt-5 text-4xl font-extrabold leading-tight lg:text-5xl">
                        Continue Your
                        <span className="block text-blue-200">
                            Shopping Journey
                        </span>
                    </h1>

                    <p className="mt-6 max-w-md text-base leading-7 text-blue-100 lg:text-lg lg:leading-8">
                        Login to access your account, manage your
                        wishlist, track orders and continue shopping.
                    </p>

                    <div className="mt-10 flex gap-2">
                        <span className="h-1.5 w-10 rounded-full bg-white" />
                        <span className="h-1.5 w-5 rounded-full bg-blue-300" />
                        <span className="h-1.5 w-5 rounded-full bg-blue-300" />
                    </div>
                </div>

                {/* Right */}
                <div className="p-6 sm:p-10 lg:p-12">
                    <div className="mx-auto max-w-md">

                        <div className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-16 sm:w-16">
                                <FaLock className="text-xl sm:text-2xl" />
                            </div>

                            <h2 className="mt-5 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-sm text-gray-500 sm:text-base">
                                Login to your account to continue
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                                    <input
                                        id="login-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="login-password"
                                        className="text-sm font-semibold text-gray-700"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        to="/forgot-password"
                                        className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 hover:underline sm:text-sm"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                                    <input
                                        id="login-password"
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
                                        autoComplete="current-password"
                                        className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>
                        </form>

                        <div className="mt-7 text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Create Account
                            </Link>
                        </div>

                        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400 sm:text-sm">
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