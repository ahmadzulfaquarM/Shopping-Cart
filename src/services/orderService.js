import api from "./api";

// create order

export const createOrder = async (
    items,
    addressId,
    paymentMethod
) => {

    const response = await api.post("/orders", {
        items,
        addressId,
        paymentMethod,
    });

    return response.data;
};

// rozerpay order

export const createRazorpayOrder = async (orderId) => {

    const response = await api.post(
        "/orders/razorpay/create",
        {
            orderId,
        }
    );

    return response.data;
};


// verify rozerpay payment

export const verifyRazorpayPayment = async ({
    orderId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
}) => {

    const response = await api.post(
        "/orders/razorpay/verify",
        {
            orderId,
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature,
        }
    );

    return response.data;
};


// Get My order
export const getMyOrders = async () => {

    const response = await api.get("/orders");

    return response.data;
};


// Get Single Order

export const getOrderById = async (id) => {

    const response = await api.get(
        `/orders/${id}`
    );

    return response.data;
};


// cencelorder

export const cancelOrder = async (id) => {

    const response = await api.put(
        `/orders/${id}/cancel`
    );

    return response.data;
};