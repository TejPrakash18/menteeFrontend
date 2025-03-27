const FeatureCard = ({ icon, title, description }) => {
    return (
      <div className="bg-gray-800 text-white p-8 rounded-2xl w-80 text-center shadow-lg">
        <div className="text-orange-400 text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-extrabold text-orange-400">{title}</h3>
        <p className="mt-2 text-sm text-gray-300">{description}</p>
      </div>
    );
  };
  
  const FeaturesSection = () => {
    return (
      <div className="flex justify-center gap-8  p-14 flex-wrap">
        <FeatureCard 
          icon={<span className="text-5xl">📄</span>}
          title="DSA Sheet"
          description="Boost your DSA skill with our handy cheat sheet"
        />
        <FeatureCard 
          icon={<span className="text-5xl">⚙️</span>}
          title="CS Subjects"
          description="Demystify CS topics with our easy-to-understand guide"
        />
        <FeatureCard 
          icon={<span className="text-5xl">📑</span>}
          title="Projects"
          description="Enhance your development skills with these engaging blogs"
        />
      </div>
    );
  };

  export default FeaturesSection;