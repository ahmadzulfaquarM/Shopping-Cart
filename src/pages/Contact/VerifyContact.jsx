import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import { verifyContactEmail } from "../../services/contactService";

const VerifyContact = () => {
    const { token } = useParams();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                if (!token) {
                    setError("Verification token is missing.");
                    return;
                }

                const response = await verifyContactEmail(token);

                if (response?.success) {
                    setSuccess(
                        response.message ||
                            "Your email has been verified successfully."
                    );
                } else {
                    setError(
                        response?.message ||
                            "Unable to verify your email."
                    );
                }
            } catch (err) {
                console.error(
                    "Contact email verification error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                        "This verification link is invalid or has expired."
                );
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <section className="flex min-h-[65vh] w-full items-center justify-center bg-slate-50 px-4 py-16">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-sm sm:p-10">

                {/* Loading */}
                {loading && (
                    <>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FaSpinner className="animate-spin text-2xl" />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Verifying Your Email
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            Please wait while we verify your email address
                            and submit your support request.
                        </p>
                    </>
                )}

                {/* Success */}
                {!loading && success && (
                    <>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <FaCheckCircle className="text-3xl" />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Email Verified!
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {success}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                to="/"
                                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Back to Home
                            </Link>

                            <Link
                                to="/contact"
                                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Contact Again
                            </Link>
                        </div>
                    </>
                )}

                {/* Error */}
                {!loading && error && (
                    <>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                            <FaTimesCircle className="text-3xl" />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900">
                            Verification Failed
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                            {error}
                        </p>

                        <div className="mt-7">
                            <Link
                                to="/contact"
                                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Try Again
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default VerifyContact;