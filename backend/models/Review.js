import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 1000,
        },
    },
    {
        timestamps: true,
    }
);

/*
    One customer can review a product only once
    for a particular order.
*/
reviewSchema.index(
    {
        product: 1,
        user: 1,
        order: 1,
    },
    {
        unique: true,
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;