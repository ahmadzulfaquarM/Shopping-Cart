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
        <header className="sticky top-0 z-50 w-full bg-white shadow-sm">

            {/* =====================================================
                MAIN NAVBAR
            ===================================================== */}

            <div className="bg-blue-600">
                <nav className="mx-auto flex h-14 max-w-7xl items-center px-3 sm:h-16 sm:px-5 lg:h-[74px] lg:gap-6 lg:px-8">

                    {/* Desktop Logo */}

                    <div className="hidden shrink-0 lg:block">
                        <Logo variant="light" />

                        <p className="-mt-1 flex items-center gap-1 text-[11px] font-medium italic text-white/80">
                            Explore
                            <span className="font-bold not-italic text-yellow-400">
                                Plus
                            </span>
                        </p>
                    </div>

                    {/* Mobile Logo */}

                    <div className="min-w-0 shrink lg:hidden">
                        <Logo variant="light" />
                    </div>

                    {/* Desktop Search */}

                    <div className="hidden min-w-0 flex-1 lg:block">
                        <SearchBar />
                    </div>

                    {/* Desktop Actions */}

                    <div className="hidden shrink-0 items-center gap-1.5 lg:flex">
                        <UserMenu
                            user={user}
                            logout={logout}
                        />

                        <MyOrdersIcon />

                        <WishlistIcon />

                        <CartIcon />

                        {user?.role === "admin" && <AdminIcon />}
                    </div>

                    {/* Mobile Menu */}

                    <div className="ml-auto shrink-0 lg:hidden">
                        <MobileMenu />
                    </div>
                </nav>
            </div>

            {/* =====================================================
                DESKTOP NAVIGATION
            ===================================================== */}

            <div className="hidden border-b border-gray-200 bg-white lg:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-12 items-center justify-center">
                        <NavLinks />
                    </div>
                </div>
            </div>

            {/* =====================================================
                MOBILE SEARCH
            ===================================================== */}

            <div className="border-b border-blue-700 bg-blue-600 px-3 pb-3 pt-1 sm:px-4 lg:hidden">
                <SearchBar />
            </div>
        </header>
    );
};

export default Navbar;