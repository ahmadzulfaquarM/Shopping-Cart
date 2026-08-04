import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {

    const [wishlistItems, setWishlistItems] = useState(() => {

        const savedWishlist = localStorage.getItem("wishlist");

        return savedWishlist
            ? JSON.parse(savedWishlist)
            : [];

    });


    // Add product
    const addToWishlist = (product) => {

        const exists = wishlistItems.some(
            (item) => item._id === product._id
        );

        if (exists) {
            toast.error("Already in wishlist");
            return;
        }

        setWishlistItems((prevItems) => [
            ...prevItems,
            product,
        ]);

        toast.success("Added to wishlist");

    };


    // Remove product
    const removeFromWishlist = (id) => {

        setWishlistItems((prevItems) =>
            prevItems.filter(
                (item) => item._id !== id
            )
        );

        toast.success("Removed from wishlist");

    };


    // Check wishlist
    const isInWishlist = (id) => {

        return wishlistItems.some(
            (item) => item._id === id
        );

    };


    // Save wishlist to localStorage
    useEffect(() => {

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlistItems)
        );

    }, [wishlistItems]);


    const wishlistCount = wishlistItems.length;


    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );

};


export const useWishlist = () => {
    return useContext(WishlistContext);
};