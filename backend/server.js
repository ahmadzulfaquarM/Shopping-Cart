import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();



connectDB();

const app = express();

/* =========================================
   MIDDLEWARE
========================================= */

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());


/* =========================================
   API ROUTES
========================================= */

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/addresses", addressRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/contact", contactRoutes);
app.use("/api/reviews", reviewRoutes);


/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {
    res.send("Backend Server is Running 🚀");
});


/* =========================================
   START SERVER
========================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});