import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";

export const createOrder = async (req, res) => {
    try {
        const {
            items,
            addressId,
            paymentMethod,
        } = req.body;

        // Validate basic data
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }

        if (!addressId) {
            return res.status(400).json({
                message: "Delivery address is required",
            });
        }

        if (!paymentMethod) {
            return res.status(400).json({
                message: "Payment method is required",
            });
        }

        // Find user's address
        const address = await Address.findOne({
            _id: addressId,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                message: "Address not found",
            });
        }

        const orderItems = [];
        let subtotal = 0;

        // Validate products and calculate price on server
        for (const item of items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.product}`,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${product.name} does not have enough stock`,
                });
            }

            const itemPrice = product.price * item.quantity;

            subtotal += itemPrice;

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
            });
        }

        // Free delivery for now
        const deliveryFee = 0;

        const totalPrice = subtotal + deliveryFee;

        // Create order
        const order = await Order.create({
            user: req.user._id,

            items: orderItems,

            shippingAddress: {
                fullName: address.fullName,
                phone: address.phone,
                address: address.address,
                city: address.city,
                state: address.state,
                pincode: address.postalCode,
            },

            paymentMethod,

            paymentStatus:
                paymentMethod === "cod"
                    ? "pending"
                    : "pending",

            orderStatus: "processing",

            subtotal,

            deliveryFee,

            totalPrice,
        });

        // Reduce stock
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock: -item.quantity,
                    },
                }
            );
        }

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};