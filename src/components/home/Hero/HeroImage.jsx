import heroImage from "../../../assets/images/hero/hero-banner.png";

const HeroImage = () => {
    return (
        <div className="relative flex w-full items-center justify-center">

            {/* Background Decoration */}
            <div className="absolute h-[480px] w-[480px] rounded-full bg-blue-50"></div>

            <div className="absolute right-10 top-16 h-5 w-5 rounded-full bg-blue-600"></div>

            <div className="absolute bottom-20 left-12 h-3 w-3 rounded-full bg-blue-300"></div>


            {/* Product Image */}
            <img
                src={heroImage}
                alt="Premium Shopping Collection"
                className="
                    relative
                    z-10
                    w-full
                    max-w-[600px]
                    object-contain
                    drop-shadow-2xl
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                "
            />

        </div>
    );
};

export default HeroImage;