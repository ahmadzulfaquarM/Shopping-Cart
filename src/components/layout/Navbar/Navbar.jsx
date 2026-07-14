import Logo from "../../common/Logo/Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import WishlistIcon from "./WishlistIcon";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">

               <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8 lg:px-12">

                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10">
                        <NavLinks />
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        <SearchBar />
                        <WishlistIcon />
                        <CartIcon />
                        <UserMenu />
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu />

                </nav>

            </div>
        </header>
    );
};

export default Navbar;