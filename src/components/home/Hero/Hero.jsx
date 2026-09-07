import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
    return (
        <section className="overflow-hidden bg-white">

            <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-14 lg:py-16 xl:px-16">

                <div className="grid min-h-0 grid-cols-1 items-center gap-12 md:gap-10 lg:min-h-[620px] lg:grid-cols-2">

                    {/* ================= LEFT CONTENT ================= */}

                    <div className="flex items-center">

                        <HeroContent />

                    </div>


                    {/* ================= RIGHT IMAGE ================= */}

                    <div className="relative flex min-h-[320px] items-center justify-center sm:min-h-[380px] md:min-h-[420px] lg:h-full lg:min-h-0">

                        <HeroImage />

                    </div>

                </div>

            </div>

        </section>
    );
};

export default Hero;