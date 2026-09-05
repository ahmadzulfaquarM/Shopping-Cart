import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-14 xl:px-16">

                <div className="grid min-h-[620px] grid-cols-2 items-center gap-10">

                    {/* Left Content */}
                    <div className="flex items-center">
                        <HeroContent />
                    </div>

                    {/* Right Image */}
                    <div className="relative flex h-full items-center justify-center">
                        <HeroImage />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;