import api from "./api";


// ======================================================
// GET REVIEWS FOR A PRODUCT
// ======================================================

export const getProductReviews = async (productId) => {
    const response = await api.get(
        `/reviews/product/${productId}`
    );

    return response.data;
};


// ======================================================
// CREATE PRODUCT REVIEW
// ======================================================

export const createReview = async (reviewData) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/reviews",
        reviewData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};