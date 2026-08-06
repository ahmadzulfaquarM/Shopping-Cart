import GuestRoute from "./components/auth/GuestRoutes";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Categories from "./pages/Categories/Categories";
import Contact from "./pages/Contact/Contact";

// Layout
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Main Layout */}
                <Route element={<MainLayout />}>

                    {/* Public Routes */}

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />

                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    <Route
                        path="/contact"
                        element={<Contact />}
                    />

                </Route>

                {/* Authentication Routes */}

                <Route element={<GuestRoute />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </Route>

                {/* Protected User Routes */}

                <Route element={<ProtectedRoute />}>

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/checkout"
                        element={<Checkout />}
                    />

                </Route>

                {/* Admin */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;