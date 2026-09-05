import "dotenv/config";

import axios from "axios";

import connectDB from "../config/db.js";
import Product from "../models/Product.js";


// ======================================================
// IMPORT PRODUCTS
// ======================================================

const importProducts = async () => {

    try {

        // ==================================================
        // CONNECT DATABASE
        // ==================================================

        console.log(
            "Connecting to MongoDB..."
        );

        await connectDB();


        // ==================================================
        // DELETE EXISTING PRODUCTS
        // ==================================================

        console.log(
            "Deleting existing products..."
        );

        const deletedProducts =
            await Product.deleteMany({});


        console.log(
            `Deleted: ${deletedProducts.deletedCount} products`
        );


        // ==================================================
        // FETCH PRODUCTS
        // ==================================================

        console.log(
            "Fetching products from DummyJSON..."
        );

        const response = await axios.get(
            "https://dummyjson.com/products?limit=0"
        );

        const products =
            response.data.products;


        console.log(
            `Fetched: ${products.length} products`
        );


        // ==================================================
        // CATEGORY MAPPING
        // ==================================================

        const categoryMap = {

            // Fashion

            "mens-shirts": "Fashion",
            "womens-dresses": "Fashion",
            "tops": "Fashion",
            "mens-watches": "Fashion",
            "womens-watches": "Fashion",
            "womens-bags": "Fashion",
            "womens-jewellery": "Fashion",
            "sunglasses": "Fashion",


            // Electronics

            "laptops": "Electronics",
            "smartphones": "Electronics",
            "tablets": "Electronics",
            "mobile-accessories": "Electronics",


            // Beauty

            "beauty": "Beauty",
            "fragrances": "Beauty",
            "skin-care": "Beauty",


            // Furniture

            "furniture": "Furniture",
            "home-decoration": "Furniture",


            // Shoes

            "mens-shoes": "Shoes",
            "womens-shoes": "Shoes",

        };


        // ==================================================
        // FILTER PRODUCTS
        // ==================================================

        const filteredProducts =
            products.filter(
                (product) =>
                    categoryMap[
                        product.category
                    ]
            );


        console.log(
            `Products matching our categories: ${filteredProducts.length}`
        );


        // ==================================================
        // FORMAT PRODUCTS
        // ==================================================

        const formattedProducts =
            filteredProducts.map(
                (product) => ({

                    name:
                        product.title,

                    description:
                        product.description,

                    price:
                        product.price,

                    category:
                        categoryMap[
                            product.category
                        ],

                    brand:
                        product.brand ||
                        "Generic",

                    image:
                        product.thumbnail,

                    stock:
                        product.stock,

                    rating:
                        product.rating || 0,

                    numReviews:
                        product.reviews?.length || 0,

                    discount:
                        product.discountPercentage || 0,

                })
            );


        // ==================================================
        // INSERT PRODUCTS
        // ==================================================

        await Product.insertMany(
            formattedProducts
        );


        // ==================================================
        // CATEGORY SUMMARY
        // ==================================================

        const categoryCounts = {};


        formattedProducts.forEach(
            (product) => {

                categoryCounts[
                    product.category
                ] =
                    (
                        categoryCounts[
                            product.category
                        ] || 0
                    ) + 1;

            }
        );


        // ==================================================
        // SUCCESS
        // ==================================================

        console.log(
            "================================"
        );

        console.log(
            "Products imported successfully!"
        );

        console.log(
            `Total imported: ${formattedProducts.length}`
        );

        console.log(
            "================================"
        );


        console.log(
            "Category Summary:"
        );


        Object.entries(
            categoryCounts
        ).forEach(
            ([category, count]) => {

                console.log(
                    `${category}: ${count}`
                );

            }
        );


        console.log(
            "================================"
        );


        process.exit(0);

    } catch (error) {

        console.error(
            "Product Import Error:",
            error.message
        );

        process.exit(1);

    }

};


importProducts();