import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

connectDB();

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/products", productRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend Server is Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});