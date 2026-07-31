import mongoose from "mongoose";
import Product from "../models/Product.js";


export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            brand,
            image,
            stock,
            rating,
            numReviews,
            discount,
        } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            brand,
            image,
            stock,
            rating,
            numReviews,
            discount,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getProducts = async (req, res) => {
    try {
        const { search, category, sort } = req.query;

        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        if (category) {
            filter.category = {
                $regex: category,
                $options: "i",
            };
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = Product.find(filter);

        if (sort === "price-low") {
            query = query.sort({ price: 1 });
        }

        if (sort === "price-high") {
            query = query.sort({ price: -1 });
        }

        if (sort === "newest") {
            query = query.sort({ createdAt: -1 });
        }

        const totalProducts = await Product.countDocuments(filter);

        const products = await query
            .skip(skip)
            .limit(limit);


        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            page,
            totalPages: Math.ceil(totalProducts / limit),
            products,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};