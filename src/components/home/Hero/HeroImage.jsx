import heroImage from "../../../assets/images/hero/hero-banner.png";

const HeroImage = () => {
    return (
        <img
            src={heroImage}
            alt="Shopping Collection"
            className="
                w-full
                max-w-sm
                md:max-w-md
                lg:max-w-xl
                xl:max-w-2xl
                object-contain
            "
        />
    );
};

export default HeroImage;