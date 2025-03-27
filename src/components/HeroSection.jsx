import FeaturesSection from "./FeaturesSection";

const HeroSection = () => {
    return (
      <section className="bg-orange-500 p-15 text-white rounded-xl mx-15 mt-5">
        <span className="bg-blue-600 px-4 py-2 rounded-lg text-lg font-semibold ml-40">#mentee</span>
        <h1 className="text-4xl font-extrabold mt-4 text-center">Gear Up for Success: Your Ultimate Preparation Hub!</h1>
        <p className="mt-3 text-lg text-center">Navigate Your Learning Adventure, and unlock your endless possibilities</p>
        <FeaturesSection/>
      </section>
    );
  };

  export default HeroSection;