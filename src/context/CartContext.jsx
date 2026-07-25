import toast from "react-hot-toast";
import { createContext, useEffect, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];

    });


    const addToCart = (product) => {

        setCartItems((prevItems) => {

            const existingItem = prevItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {

                return prevItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );

            }


            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];

        });

        toast.success("Added to cart");

    };

    const increaseQuantity = (id) => {

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );

    };

    const decreaseQuantity = (id) => {

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity > 1
                                ? item.quantity - 1
                                : 1,
                    }
                    : item
            )
        );

    };

    const removeFromCart = (id) => {

        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );

          toast.success("Removed from cart");

    };

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                cartCount,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);