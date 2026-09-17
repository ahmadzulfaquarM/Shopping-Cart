import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/*
|--------------------------------------------------------------------------
| Send Verification Email
|--------------------------------------------------------------------------
*/

export const sendVerificationEmail = async (
    email,
    verificationUrl
) => {
    const mailOptions = {
        from: `"Shopify" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Verify your Shopify account",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 650px;
                margin: 0 auto;
            ">
                <h2 style="color: #2563eb;">
                    Welcome to Shopify
                </h2>

                <p>
                    Thank you for creating an account with us.
                </p>

                <p>
                    Please verify your email address by clicking the button below:
                </p>

                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                    "
                >
                    Verify Email
                </a>

                <p style="margin-top: 20px;">
                    This verification link will expire soon.
                </p>

                <p>
                    If you did not create this account, you can safely ignore this email.
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};


/*
|--------------------------------------------------------------------------
| Send Password Reset Email
|--------------------------------------------------------------------------
*/

export const sendPasswordResetEmail = async (
    email,
    resetUrl
) => {
    const mailOptions = {
        from: `"Shopify" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Reset your Shopify password",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 650px;
                margin: 0 auto;
            ">
                <h2 style="color: #2563eb;">
                    Reset Your Password
                </h2>

                <p>
                    We received a request to reset your Shopify password.
                </p>

                <p>
                    Click the button below to create a new password:
                </p>

                <a
                    href="${resetUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background: #2563eb;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                    "
                >
                    Reset Password
                </a>

                <p style="margin-top: 20px;">
                    If you did not request a password reset, you can safely ignore this email.
                </p>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};


/*
|--------------------------------------------------------------------------
| Send Contact Email Verification
|--------------------------------------------------------------------------
*/

export const sendContactVerificationEmail = async (
    email,
    name,
    verificationUrl
) => {
    const mailOptions = {
        from: `"Shopify Support" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "Verify your email to contact Shopify Support",

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 650px;
                margin: 0 auto;
            ">
                <div style="
                    background: #2563eb;
                    color: white;
                    padding: 22px;
                    border-radius: 10px 10px 0 0;
                ">
                    <h2 style="margin: 0;">
                        Verify Your Email
                    </h2>

                    <p style="margin: 6px 0 0;">
                        Shopify Customer Support
                    </p>
                </div>

                <div style="
                    border: 1px solid #e5e7eb;
                    border-top: none;
                    padding: 24px;
                    border-radius: 0 0 10px 10px;
                ">
                    <p>
                        Hello ${name},
                    </p>

                    <p>
                        We received a request to contact Shopify Support
                        using this email address.
                    </p>

                    <p>
                        Please verify that you own this email address
                        before we submit your support request.
                    </p>

                    <a
                        href="${verificationUrl}"
                        style="
                            display: inline-block;
                            padding: 13px 22px;
                            background: #2563eb;
                            color: white;
                            text-decoration: none;
                            border-radius: 8px;
                            font-weight: bold;
                        "
                    >
                        Verify Email & Submit Message
                    </a>

                    <p style="
                        margin-top: 22px;
                        color: #6b7280;
                        font-size: 13px;
                    ">
                        This verification link will expire in 15 minutes.
                    </p>

                    <p style="
                        color: #6b7280;
                        font-size: 13px;
                    ">
                        If you did not request this message, you can safely
                        ignore this email.
                    </p>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};


/*
|--------------------------------------------------------------------------
| Send Contact Notification to Admin
|--------------------------------------------------------------------------
*/

export const sendContactEmail = async (
    name,
    email,
    subject,
    message
) => {
    const mailOptions = {
        from: `"Shopify Contact Form" <${process.env.EMAIL_USER}>`,

        // Admin/support email
        to: process.env.EMAIL_USER,

        // Customer's email
        replyTo: email,

        subject: `Contact Form: ${subject}`,

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 650px;
                margin: 0 auto;
            ">
                <div style="
                    background: #2563eb;
                    color: white;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                ">
                    <h2 style="margin: 0;">
                        New Customer Message
                    </h2>

                    <p style="margin: 6px 0 0;">
                        Shopify Contact Form
                    </p>
                </div>

                <div style="
                    border: 1px solid #e5e7eb;
                    border-top: none;
                    padding: 24px;
                    border-radius: 0 0 10px 10px;
                ">
                    <p>
                        <strong>Customer Name:</strong>
                        ${name}
                    </p>

                    <p>
                        <strong>Customer Email:</strong>
                        ${email}
                    </p>

                    <p>
                        <strong>Subject:</strong>
                        ${subject}
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #e5e7eb;
                        margin: 20px 0;
                    " />

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <div style="
                        background: #f8fafc;
                        padding: 16px;
                        border-radius: 8px;
                        white-space: pre-wrap;
                    ">
                        ${message}
                    </div>

                    <p style="
                        margin-top: 24px;
                        color: #6b7280;
                        font-size: 13px;
                    ">
                        This customer has verified ownership of the submitted
                        email address.
                    </p>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};


/*
|--------------------------------------------------------------------------
| Send Reply to Customer
|--------------------------------------------------------------------------
*/

export const sendContactReplyEmail = async (
    email,
    name,
    originalSubject,
    replyMessage
) => {
    const mailOptions = {
        from: `"Shopify Support" <${process.env.EMAIL_USER}>`,

        to: email,

        replyTo: process.env.EMAIL_USER,

        subject: `Re: ${originalSubject}`,

        html: `
            <div style="
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 650px;
                margin: 0 auto;
            ">
                <div style="
                    background: #2563eb;
                    color: white;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                ">
                    <h2 style="margin: 0;">
                        Shopify Support
                    </h2>
                </div>

                <div style="
                    border: 1px solid #e5e7eb;
                    border-top: none;
                    padding: 24px;
                    border-radius: 0 0 10px 10px;
                ">
                    <p>
                        Hello ${name},
                    </p>

                    <div style="
                        background: #f8fafc;
                        padding: 16px;
                        border-radius: 8px;
                        white-space: pre-wrap;
                    ">
                        ${replyMessage}
                    </div>

                    <p style="
                        margin-top: 24px;
                        color: #6b7280;
                        font-size: 13px;
                    ">
                        Regards,<br />
                        Shopify Support Team
                    </p>
                </div>
            </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};

