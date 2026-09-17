import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/User.js";

import {
    sendVerificationEmail,
    sendPasswordResetEmail,
} from "../services/emailService.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const trimmedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!trimmedName) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken =
            crypto.randomBytes(32).toString("hex");

        const verificationExpires =
            new Date(Date.now() + 15 * 60 * 1000);

        const user = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            password: hashedPassword,
            isEmailVerified: false,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires,
        });

        try {
            const verificationUrl =
                `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

            await sendVerificationEmail(
                user.email,
                verificationUrl
            );
        } catch (emailError) {
            console.error(
                "Verification Email Error:",
                emailError
            );

            await User.findByIdAndDelete(user._id);

            return res.status(500).json({
                success: false,
                message:
                    "Unable to send verification email. Please try again.",
            });
        }

        return res.status(201).json({
            success: true,
            message:
                "Registration successful. Please check your email to verify your account.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isBlocked: user.isBlocked,
                isEmailVerified: user.isEmailVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "Register User Error:",
            error
        );

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address",
            });
        }

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        if (user.isBlocked) {
            return res.status(403).json({
                success: false,
                message:
                    "Your account has been blocked by the administrator",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message:
                    "Please verify your email before logging in",
                emailVerified: false,
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isBlocked: user.isBlocked,
                isEmailVerified:
                    user.isEmailVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "Login User Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| Get User Profile
|--------------------------------------------------------------------------
*/

export const getUserProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

/*
|--------------------------------------------------------------------------
| Update User Profile
|--------------------------------------------------------------------------
*/

export const updateUserProfile = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const user = await User.findById(
            req.user._id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.name = name.trim();

        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            user: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                isBlocked: updatedUser.isBlocked,
                isEmailVerified:
                    updatedUser.isEmailVerified,
                createdAt:
                    updatedUser.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "Update User Profile Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| Verify Email
|--------------------------------------------------------------------------
*/

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                success: false,
                message:
                    "Verification token is required",
            });
        }

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid or expired verification token",
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified",
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationExpires = null;

        await user.save();

        const jwtToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            token: jwtToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isBlocked: user.isBlocked,
                isEmailVerified:
                    user.isEmailVerified,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "Verify Email Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| Forgot Password
|--------------------------------------------------------------------------
*/

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail =
            email.trim().toLowerCase();

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address",
            });
        }

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "No account found with this email",
            });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message:
                    "Please verify your email first",
            });
        }

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        user.passwordResetToken = resetToken;

        user.passwordResetExpires =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        try {
            const resetUrl =
                `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

            await sendPasswordResetEmail(
                user.email,
                resetUrl
            );
        } catch (emailError) {
            console.error(
                "Password Reset Email Error:",
                emailError
            );

            user.passwordResetToken = null;
            user.passwordResetExpires = null;

            await user.save();

            return res.status(500).json({
                success: false,
                message:
                    "Unable to send password reset email. Please try again.",
            });
        }

        return res.status(200).json({
            success: true,
            message:
                "Password reset link has been sent to your email",
        });
    } catch (error) {
        console.error(
            "Forgot Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/*
|--------------------------------------------------------------------------
| Reset Password
|--------------------------------------------------------------------------
*/

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Reset token is required",
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters",
            });
        }

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid or expired reset link",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully. You can now login.",
        });
    } catch (error) {
        console.error(
            "Reset Password Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};