import { useEffect, useState } from "react";
import {
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

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
            setMessage("Verification token is missing");
            return;
        }

        verifyEmail();
    }, [token, navigate]);

    if (loading) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-10">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
                    </div>

                    <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
                        Verifying Your Email
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Please wait while we verify your email address.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-10">

                {success ? (
                    <>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                            <FaCheckCircle className="text-3xl" />
                        </div>

                        <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            Email Verified!
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            {message}
                        </p>

                        <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                            Taking you to the home page...
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                            <FaTimesCircle className="text-3xl" />
                        </div>

                        <h1 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                            Verification Failed
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                            {message}
                        </p>

                        <Link
                            to="/register"
                            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        >
                            Back to Register
                        </Link>
                    </>
                )}
            </div>
        </section>
    );
};

export default VerifyEmail;