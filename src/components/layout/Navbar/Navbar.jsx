import { useAuth } from "../../../context/AuthContext";

import Logo from "../../common/Logo/Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import WishlistIcon from "./WishlistIcon";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import MyOrdersIcon from "./MyOrdersIcon";
import AdminIcon from "./AdminIcon";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full shadow-md">

            {/* ================= TOP NAVBAR (solid brand blue, Flipkart style) ================= */}

            <div className="bg-blue-600">

                <nav className="mx-auto flex h-[74px] max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">

                    {/* Logo (stacked with tagline like Flipkart's "Explore Plus") */}

                    <div className="hidden shrink-0 lg:block">
                        <Logo variant="light" />
                        <p className="-mt-1 flex items-center gap-1 text-[11px] font-medium italic text-white/80">
                            Explore
                            <span className="font-bold not-italic text-yellow-400">
                                Plus
                            </span>
                        </p>
                    </div>

                    <div className="lg:hidden">
                        <Logo variant="light" />
                    </div>


                    {/* Search */}

                    <div className="hidden flex-1 lg:block">
                        <SearchBar />
                    </div>


                    {/* Desktop Actions */}

                    <div className="hidden items-center gap-2 lg:flex">

                        <UserMenu
                            user={user}
                            logout={logout}
                        />

                        <MyOrdersIcon />

                        <WishlistIcon />

                        <CartIcon />

                        {user?.role === "admin" && (
                            <AdminIcon />
                        )}

                    </div>


                    {/* Mobile */}

                    <div className="ml-auto lg:hidden">
                        <MobileMenu />
                    </div>

                </nav>

            </div>


            {/* ================= CATEGORY NAVIGATION ================= */}

            <div className="hidden border-b border-gray-100 bg-white lg:block">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="flex h-12 items-center justify-between">

                        <NavLinks />

                    </div>

                </div>

            </div>


            {/* ================= MOBILE SEARCH ================= */}

            <div className="bg-blue-600 px-4 pb-3 lg:hidden">
                <SearchBar />
            </div>

        </header>
    );
};

export default Navbar;
