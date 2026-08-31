import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelopeCircleCheck } from "react-icons/fa6";
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
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            name,
            email,
            password,
            confirmPassword,
        } = formData;

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error(
                "Password must be at least 6 characters"
            );
            return;
        }

        try {
            setLoading(true);

            const data = await registerUser(
                name,
                email,
                password
            );

            setRegisteredEmail(
                data.user?.email || email.trim().toLowerCase()
            );

            setRegistrationComplete(true);

            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            toast.success(
                "Verification email sent!"
            );

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
            <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">

                <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">

                    <FaEnvelopeCircleCheck className="mx-auto text-6xl text-blue-600" />

                    <h1 className="mt-6 text-3xl font-bold text-gray-900">
                        Check Your Email
                    </h1>

                    <p className="mt-4 text-gray-600">
                        We have sent a verification link to:
                    </p>

                    <p className="mt-2 break-all font-semibold text-gray-900">
                        {registeredEmail}
                    </p>

                    <p className="mt-5 text-sm leading-6 text-gray-500">
                        Please open your email and click the
                        verification link to activate your
                        account.
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                        After verification, you will be
                        automatically taken to the home page.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setRegistrationComplete(false)
                        }
                        className="mt-8 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                    >
                        Register Another Account
                    </button>

                    <p className="mt-6 text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </section>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 px-4 py-16">

            <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="mt-2 text-gray-500">
                    Register to start shopping.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-blue-600"
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

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </section>
    );
};

export default Register;