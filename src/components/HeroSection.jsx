import FeaturesSection from "./FeaturesSection";
import TypingEffect from "./Typed";

const HeroSection = () => {
    return (
        <section className=" pt-20 px-16 py-8 sm:px-6 md:px-16 lg:px-24 text-white rounded-xl mt-5 max-w-7xl mx-auto">

            {/* Main Title */}
            <h1 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-center leading-tight">
                Gear Up for Success: Your Ultimate Preparation Hub!
            </h1>

            {/* Subheading with Typing Effect */}
            <p className="mt-4 text-4xl sm:text-2xl md:text-3xl font-bold text-center">
                Advance Your Career with <TypingEffect />
            </p>

            {/* <p className="pt-10 text-center text-white text-base font-normal ">          
                Master your Brain with curated resources and expert guidance - Learn the Skills that set you apart and join the Top coders
            </p> */}
            {/* Features Section */}
            <div className="mt-10">
                <FeaturesSection />
            </div>
        </section>
    );
};

export default HeroSection;
