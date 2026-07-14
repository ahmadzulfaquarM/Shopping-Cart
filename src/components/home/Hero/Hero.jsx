import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

const Hero = () => {
    return (
        <section className="bg-white">
           <div className="mx-auto max-w-[1440px] px-4 py-20 md:px-8 lg:px-12">

                <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">

                    {/* Hero Content */}
                    <div className="lg:pr-6">
                        <HeroContent />
                    </div>

                    {/* Hero Image */}
                    <div className="flex justify-center md:justify-end">
                        <HeroImage />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;