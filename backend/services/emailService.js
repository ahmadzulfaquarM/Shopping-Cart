import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (
    email,
    name,
    verificationToken
) => {
    const verificationUrl =
        `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    await transporter.sendMail({
        from: `"Shopping Cart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your Shopping Cart account",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: auto;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
            ">

                <h2 style="color: #2563eb;">
                    Welcome to Shopping Cart!
                </h2>

                <p>
                    Hello ${name},
                </p>

                <p>
                    Thank you for creating an account.
                    Please verify your email address to activate your account.
                </p>

                <div style="margin: 30px 0;">
                    <a
                        href="${verificationUrl}"
                        style="
                            display: inline-block;
                            padding: 12px 24px;
                            background-color: #2563eb;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: bold;
                        "
                    >
                        Verify Email
                    </a>
                </div>

                <p style="color: #6b7280;">
                    This verification link will expire in 24 hours.
                </p>

                <p style="color: #6b7280;">
                    If you did not create this account, you can safely ignore
                    this email.
                </p>

                <hr style="border: 0; border-top: 1px solid #e5e7eb;">

                <p style="font-size: 12px; color: #9ca3af;">
                    This is an automated email. Please do not reply.
                </p>

            </div>
        `,
    });
};

export const sendPasswordResetEmail = async (
    email,
    name,
    resetToken
) => {
    const resetUrl =
        `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
        from: `"Shopping Cart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Shopping Cart Password",

        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                <h2 style="color: #2563eb;">
                    Password Reset Request
                </h2>

                <p>
                    Hello ${name},
                </p>

                <p>
                    We received a request to reset your Shopping Cart account password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <div style="margin: 30px 0;">
                    <a
                        href="${resetUrl}"
                        style="
                            background-color: #2563eb;
                            color: white;
                            padding: 12px 24px;
                            text-decoration: none;
                            border-radius: 8px;
                            display: inline-block;
                            font-weight: bold;
                        "
                    >
                        Reset Password
                    </a>
                </div>

                <p>
                    This link will expire in <strong>15 minutes</strong>.
                </p>

                <p>
                    If you did not request a password reset, you can safely ignore this email.
                </p>

                <p style="margin-top: 30px; color: #666;">
                    Regards,<br />
                    Shopping Cart Team
                </p>

            </div>
        `,
    });
};