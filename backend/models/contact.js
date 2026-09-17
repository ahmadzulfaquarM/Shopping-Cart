import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },

        subject: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },

        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 2000,
        },

        // Whether the customer has proved ownership
        // of the submitted email address.
        emailVerified: {
            type: Boolean,
            default: false,
        },

        // Temporary verification token.
        // This is cleared after successful verification.
        verificationToken: {
            type: String,
            default: null,
        },

        // Verification token expiry time.
        verificationTokenExpires: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["new", "read", "replied"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;