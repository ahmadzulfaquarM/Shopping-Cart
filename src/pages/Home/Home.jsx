import Hero from "../../components/home/Hero";
import Categories from "../../components/home/Categories";
import FeaturedProducts from "../../components/home/FeaturedProducts";
import PromotionalBanner from "../../components/home/PromotionalBanner";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import NewArrivals from "../../components/home/NewArrivals";
import Testimonials from "../../components/home/Testimonials";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
    return (
        <>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <PromotionalBanner />
            <WhyChooseUs />
            <NewArrivals/>
            <Testimonials/>
            <Newsletter/>
        </>
    );
};

export default Home;