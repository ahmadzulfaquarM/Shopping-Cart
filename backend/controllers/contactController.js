import crypto from "crypto";

import Contact from "../models/contact.js";

import {
    sendContactVerificationEmail,
    sendContactEmail,
    sendContactReplyEmail,
} from "../services/emailService.js";


/*
|--------------------------------------------------------------------------
| Customer: Create Contact Request
|--------------------------------------------------------------------------
*/

export const createContactMessage = async (req, res) => {
    try {
        const {
            name,
            email,
            subject,
            message,
        } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();

        if (cleanName.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 2 characters.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        if (cleanSubject.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Subject must be at least 3 characters.",
            });
        }

        if (cleanMessage.length < 5) {
            return res.status(400).json({
                success: false,
                message: "Message must be at least 5 characters.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Generate secure verification token
        |--------------------------------------------------------------------------
        */

        const verificationToken =
            crypto.randomBytes(32).toString("hex");

        const verificationTokenExpires =
            new Date(Date.now() + 15 * 60 * 1000);

        /*
        |--------------------------------------------------------------------------
        | Remove old unverified requests
        |--------------------------------------------------------------------------
        */

        await Contact.deleteMany({
            email: cleanEmail,
            emailVerified: false,
        });

        /*
        |--------------------------------------------------------------------------
        | Create pending contact
        |--------------------------------------------------------------------------
        */

        const contactMessage = await Contact.create({
            name: cleanName,
            email: cleanEmail,
            subject: cleanSubject,
            message: cleanMessage,
            emailVerified: false,
            verificationToken,
            verificationTokenExpires,
            status: "new",
        });

        const frontendUrl =
            process.env.FRONTEND_URL ||
            "http://localhost:5173";

        const verificationUrl =
            `${frontendUrl}/verify-contact/${verificationToken}`;

        /*
        |--------------------------------------------------------------------------
        | Send verification email
        |--------------------------------------------------------------------------
        */

        try {
            await sendContactVerificationEmail(
                cleanEmail,
                cleanName,
                verificationUrl
            );
        } catch (emailError) {
            console.error(
                "Contact verification email error:",
                emailError
            );

            await Contact.findByIdAndDelete(
                contactMessage._id
            );

            return res.status(500).json({
                success: false,
                message:
                    "We could not send the verification email. Please try again later.",
            });
        }

        return res.status(201).json({
            success: true,

            message:
                "Verification email sent. Please check your inbox and verify your email address.",

            contactId: contactMessage._id,
        });
    } catch (error) {
        console.error(
            "Create contact message error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to process your request. Please try again later.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Customer: Verify Contact Email
|--------------------------------------------------------------------------
*/

export const verifyContactEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                success: false,
                message:
                    "Verification token is required.",
            });
        }

        const contactMessage = await Contact.findOne({
            verificationToken: token,

            verificationTokenExpires: {
                $gt: new Date(),
            },

            emailVerified: false,
        });

        if (!contactMessage) {
            return res.status(400).json({
                success: false,
                message:
                    "This verification link is invalid or has expired.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Verify email ownership
        |--------------------------------------------------------------------------
        */

        contactMessage.emailVerified = true;

        contactMessage.verificationToken = null;

        contactMessage.verificationTokenExpires = null;

        await contactMessage.save();

        /*
        |--------------------------------------------------------------------------
        | Notify admin
        |--------------------------------------------------------------------------
        */

        let emailSent = false;

        try {
            await sendContactEmail(
                contactMessage.name,
                contactMessage.email,
                contactMessage.subject,
                contactMessage.message
            );

            emailSent = true;
        } catch (emailError) {
            console.error(
                "Contact admin notification error:",
                emailError
            );
        }

        return res.status(200).json({
            success: true,

            message:
                "Your email has been verified and your message has been submitted successfully.",

            emailSent,

            contact: {
                id: contactMessage._id,
                name: contactMessage.name,
                email: contactMessage.email,
                subject: contactMessage.subject,
                status: contactMessage.status,
                emailVerified:
                    contactMessage.emailVerified,
                createdAt:
                    contactMessage.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "Verify contact email error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to verify your email. Please try again later.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Admin: Get All Contact Messages
|--------------------------------------------------------------------------
*/

export const getContactMessages = async (req, res) => {
    try {
        const {
            status,
            search,
            page = 1,
            limit = 10,
        } = req.query;

        const filter = {
            emailVerified: true,
        };

        /*
        |--------------------------------------------------------------------------
        | Status filter
        |--------------------------------------------------------------------------
        */

        if (
            status &&
            ["new", "read", "replied"].includes(status)
        ) {
            filter.status = status;
        }

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if (search?.trim()) {
            const searchTerm = search.trim();

            filter.$or = [
                {
                    name: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
                {
                    subject: {
                        $regex: searchTerm,
                        $options: "i",
                    },
                },
            ];
        }

        const pageNumber =
            Math.max(parseInt(page, 10) || 1, 1);

        const limitNumber =
            Math.min(
                Math.max(parseInt(limit, 10) || 10, 1),
                50
            );

        const skip =
            (pageNumber - 1) * limitNumber;

        const [messages, totalMessages] =
            await Promise.all([
                Contact.find(filter)
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limitNumber)
                    .select(
                        "name email subject message status emailVerified createdAt updatedAt"
                    ),

                Contact.countDocuments(filter),
            ]);

        const totalPages =
            Math.ceil(
                totalMessages / limitNumber
            );

        return res.status(200).json({
            success: true,

            messages,

            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalMessages,
                limit: limitNumber,
            },
        });
    } catch (error) {
        console.error(
            "Get contact messages error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to load contact messages.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Admin: Get Single Contact Message
|--------------------------------------------------------------------------
*/

export const getContactMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const contactMessage =
            await Contact.findOne({
                _id: id,
                emailVerified: true,
            });

        if (!contactMessage) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found.",
            });
        }

        return res.status(200).json({
            success: true,
            contact: contactMessage,
        });
    } catch (error) {
        console.error(
            "Get contact message error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to load contact message.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Admin: Update Contact Status
|--------------------------------------------------------------------------
*/

export const updateContactStatus = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const { status } = req.body;

        if (
            !["new", "read", "replied"].includes(
                status
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid contact status.",
            });
        }

        const contactMessage =
            await Contact.findOneAndUpdate(
                {
                    _id: id,
                    emailVerified: true,
                },
                {
                    status,
                },
                {
                    new: true,
                }
            );

        if (!contactMessage) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found.",
            });
        }

        return res.status(200).json({
            success: true,

            message:
                "Contact status updated successfully.",

            contact: contactMessage,
        });
    } catch (error) {
        console.error(
            "Update contact status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update contact status.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Admin: Delete Contact Message
|--------------------------------------------------------------------------
*/

export const deleteContactMessage = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const contactMessage =
            await Contact.findOneAndDelete({
                _id: id,
                emailVerified: true,
            });

        if (!contactMessage) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Contact message deleted successfully.",
        });
    } catch (error) {
        console.error(
            "Delete contact message error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to delete contact message.",
        });
    }
};


/*
|--------------------------------------------------------------------------
| Admin: Reply to Customer
|--------------------------------------------------------------------------
*/

export const replyToContactMessage = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const { replyMessage } = req.body;

        if (!replyMessage?.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Reply message is required.",
            });
        }

        const contactMessage =
            await Contact.findOne({
                _id: id,
                emailVerified: true,
            });

        if (!contactMessage) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found.",
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Send reply
        |--------------------------------------------------------------------------
        */

        await sendContactReplyEmail(
            contactMessage.email,
            contactMessage.name,
            contactMessage.subject,
            replyMessage.trim()
        );

        /*
        |--------------------------------------------------------------------------
        | Mark as replied
        |--------------------------------------------------------------------------
        */

        contactMessage.status = "replied";

        await contactMessage.save();

        return res.status(200).json({
            success: true,
            message:
                "Reply sent successfully.",

            contact: contactMessage,
        });
    } catch (error) {
        console.error(
            "Reply to contact message error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to send reply. Please try again.",
        });
    }
};