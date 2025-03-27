import FeaturesSection from "./FeaturesSection";

const HeroSection = () => {
    return (
      <section className="bg-orange-500 text-center p-16 text-white rounded-xl mx-4 mt-6">
        <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">#mentee</span>
        <h1 className="text-4xl font-extrabold mt-4">Gear Up for Success: Your Ultimate Preparation Hub!</h1>
        <p className="mt-3 text-lg">Navigate Your Learning Adventure, and unlock your endless possibilities</p>
        <FeaturesSection/>
      </section>
    );
  };

  export default HeroSection;