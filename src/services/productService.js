import api from "./api";


// Get all products

export const getProducts = async (params = {}) => {

    const response = await api.get("/products", {
        params,
    });

    return response.data;
};


// Get single product

export const getProductById = async (id) => {

    const response = await api.get(
        `/products/${id}`
    );

    return response.data;
};


// Update product

export const updateProduct = async (
    id,
    productData
) => {

    const response = await api.put(
        `/products/${id}`,
        productData
    );

    return response.data;
};

// update Product
export const deleteProduct = async (id) => {

    const response = await api.delete(
        `/products/${id}`
    );

    return response.data;
};