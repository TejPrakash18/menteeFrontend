import FeaturesSection from "./FeaturesSection";
import TypingEffect from "./Typed";

const HeroSection = () => {
    return (
      <section className="p-15 text-white rounded-xl mx-15 mt-5 ">
        <span className="bg-blue-600 px-4 py-2 rounded-lg text-lg font-semibold ml-40">Mentee</span>
        <h1 className="text-4xl font-extrabold mt-4 text-center">Gear Up for Success: Your Ultimate Preparation Hub!</h1>
          <p className="mt-3 text-3xl font-extrabold text-center">
              Advance Your Career with <TypingEffect />
          </p>
        <FeaturesSection/>
      </section>
    );
  };

  export default HeroSection;