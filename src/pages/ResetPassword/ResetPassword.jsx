import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
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
            toast.error(
                "Password must be at least 6 characters"
            );
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

            toast.success(
                "Password reset successfully"
            );

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
            <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">

                <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">

                        <FaLock className="text-2xl" />

                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900">
                        Password Reset Successful
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Your password has been changed successfully.
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        You can now login with your new password.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Go to Login
                    </button>

                </div>

            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-16">

            <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">

                        <FaLock />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold text-gray-900">
                            Reset Password
                        </h1>

                        <p className="text-sm text-gray-500">
                            Create a new password
                        </p>

                    </div>

                </div>

                <p className="mb-6 text-gray-600">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block font-medium text-gray-700">
                            New Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter new password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        (prev) => !prev
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
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

                        <label className="mb-2 block font-medium text-gray-700">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
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
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prev) => !prev
                                    )
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
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
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading
                            ? "Resetting Password..."
                            : "Reset Password"}
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Back to Login
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default ResetPassword;