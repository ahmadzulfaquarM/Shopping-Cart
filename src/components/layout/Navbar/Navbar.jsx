import Logo from "../../common/Logo/Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import WishlistIcon from "./WishlistIcon";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
    return (
       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
            <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-8 lg:px-12 xl:px-16">

                <Logo />

                <div className="hidden lg:flex items-center gap-10">
                    <NavLinks />
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    <SearchBar />
                    <WishlistIcon />
                    <CartIcon />
                    <UserMenu />
                </div>

                <MobileMenu />

            </nav>
        </header>
    );
};

export default Navbar;