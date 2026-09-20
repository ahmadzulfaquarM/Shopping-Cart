import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    FaEye,
    FaEyeSlash,
    FaLock,
} from "react-icons/fa";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!token) {
            toast.error("Invalid reset link");
            return;
        }

        try {
            setLoading(true);

            await resetPassword(token, password);

            setSuccess(true);

            toast.success("Password reset successfully");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Unable to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-xl sm:p-10">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                        <FaLock className="text-2xl" />
                    </div>

                    <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                        Password Reset Successful
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                        Your password has been changed successfully.
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        You can now login with your new password.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        Go to Login
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-9">

                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <FaLock />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                            Reset Password
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Create a new password
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-gray-600 sm:text-base">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="reset-password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            New Password
                        </label>

                        <div className="relative">
                            <input
                                id="reset-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter new password"
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
                            htmlFor="reset-confirm-password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                id="reset-confirm-password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-50 sm:text-base"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prev) => !prev
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 transition hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {showConfirmPassword ? (
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
                        className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"}
                    </button>
                </form>

                <div className="mt-7 text-center">
                    <Link
                        to="/login"
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ResetPassword;