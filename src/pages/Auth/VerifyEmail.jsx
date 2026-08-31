import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setLoading(true);

                const response = await api.get(
                    `/auth/verify-email/${token}`
                );

                const data = response.data;

                if (!data.success) {
                    setSuccess(false);
                    setMessage(
                        data.message ||
                        "Email verification failed"
                    );
                    return;
                }

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setSuccess(true);

                setMessage(
                    "Email verified successfully!"
                );

                setTimeout(() => {
                    navigate("/", {
                        replace: true,
                    });
                }, 1500);

            } catch (error) {
                console.error(
                    "Email Verification Error:",
                    error
                );

                setSuccess(false);

                setMessage(
                    error.response?.data?.message ||
                    "Email verification failed"
                );
            } finally {
                setLoading(false);
            }
        };

        if (!token) {
            setLoading(false);
            setSuccess(false);
            setMessage(
                "Verification token is missing"
            );
            return;
        }

        verifyEmail();
    }, [token, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

                    <h1 className="text-xl font-bold text-gray-900">
                        Verifying your email...
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Please wait.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

                {success ? (
                    <>
                        <FaCheckCircle className="mx-auto text-6xl text-green-500" />

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Email Verified!
                        </h1>

                        <p className="mt-3 text-gray-600">
                            {message}
                        </p>

                        <p className="mt-4 text-sm text-gray-400">
                            Taking you to the home page...
                        </p>
                    </>
                ) : (
                    <>
                        <FaTimesCircle className="mx-auto text-6xl text-red-500" />

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Verification Failed
                        </h1>

                        <p className="mt-3 text-gray-600">
                            {message}
                        </p>

                        <Link
                            to="/register"
                            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Back to Register
                        </Link>
                    </>
                )}

            </div>

        </div>
    );
};

export default VerifyEmail;