import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>

        <AuthProvider>

            <CartProvider>

                <WishlistProvider>

                    <App />

                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />

                </WishlistProvider>

            </CartProvider>

        </AuthProvider>

    </StrictMode>
);