import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ======================================================
// REGISTER USER
// ======================================================

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        // Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });

    } catch (error) {

        console.error(
            "Register User Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// LOGIN USER
// ======================================================

export const loginUser = async (req, res) => {
    try {

        const {
            email,
            password,
        } = req.body;


        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email and Password are required",
            });
        }


        // Find user
        const user = await User.findOne({
            email,
        });


        // User does not exist
        if (!user) {
            return res.status(400).json({
                message:
                    "Invalid Email or Password",
            });
        }


        // ==================================================
        // CHECK IF USER IS BLOCKED
        // ==================================================

        if (user.isBlocked) {

            return res.status(403).json({
                success: false,
                message:
                    "Your account has been blocked by the administrator",
            });

        }


        // ==================================================
        // CHECK PASSWORD
        // ==================================================

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {
            return res.status(400).json({
                message:
                    "Invalid Email or Password",
            });
        }


        // ==================================================
        // CREATE JWT TOKEN
        // ==================================================

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );


        // ==================================================
        // LOGIN SUCCESS
        // ==================================================

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user,
        });

    } catch (error) {

        console.error(
            "Login User Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================================
// GET USER PROFILE
// ======================================================

export const getUserProfile = async (req, res) => {

    return res.status(200).json({
        success: true,
        user: req.user,
    });

};


// ======================================================
// UPDATE USER PROFILE
// ======================================================

export const updateUserProfile = async (req, res) => {
    try {

        const {
            name,
        } = req.body;


        // Validate name
        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Name is required",
            });
        }


        // Find logged-in user
        const user = await User.findById(
            req.user._id
        );


        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        // Update name
        user.name = name.trim();


        const updatedUser =
            await user.save();


        return res.status(200).json({
            success: true,
            message:
                "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {

        console.error(
            "Update User Profile Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};