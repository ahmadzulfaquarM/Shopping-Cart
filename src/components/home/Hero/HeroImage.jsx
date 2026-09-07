import heroImage from "../../../assets/images/hero/hero-banner.png";

const HeroImage = () => {
    return (
        <div className="relative flex w-full items-center justify-center overflow-visible">

            {/* ================= BACKGROUND CIRCLE ================= */}

            <div
                className="
                    absolute
                    h-[300px]
                    w-[300px]
                    rounded-full
                    bg-blue-50
                    sm:h-[380px]
                    sm:w-[380px]
                    md:h-[420px]
                    md:w-[420px]
                    lg:h-[480px]
                    lg:w-[480px]
                "
            />


            {/* ================= TOP DECORATION ================= */}

            <div
                className="
                    absolute
                    right-[8%]
                    top-[10%]
                    h-3
                    w-3
                    rounded-full
                    bg-blue-600
                    sm:h-4
                    sm:w-4
                    lg:right-10
                    lg:top-16
                    lg:h-5
                    lg:w-5
                "
            />


            {/* ================= BOTTOM DECORATION ================= */}

            <div
                className="
                    absolute
                    bottom-[12%]
                    left-[10%]
                    h-2
                    w-2
                    rounded-full
                    bg-blue-300
                    sm:h-3
                    sm:w-3
                    lg:bottom-20
                    lg:left-12
                "
            />


            {/* ================= PRODUCT IMAGE ================= */}

            <img
                src={heroImage}
                alt="Premium Shopping Collection"
                className="
                    relative
                    z-10
                    w-full
                    max-w-[340px]
                    object-contain
                    drop-shadow-2xl
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                    sm:max-w-[420px]
                    md:max-w-[500px]
                    lg:max-w-[600px]
                "
            />

        </div>
    );
};

export default HeroImage;