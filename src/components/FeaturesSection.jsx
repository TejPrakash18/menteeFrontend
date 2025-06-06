const FeatureCard = ({ icon, title, description, borderColor, textColor }) => {
    return (
        <div className={`bg-[#1F2937] border-t-4 ${borderColor} rounded-2xl w-full sm:w-[18rem] p-6 flex flex-col items-start text-white shadow-md hover:scale-105 transform transition duration-300 ease-in-out`}>
            <div className={`text-5xl mb-4 ${textColor}`}>{icon}</div>
            <h3 className={`text-lg sm:text-xl font-bold ${textColor}`}>{title}</h3>
            <p className="text-sm text-gray-300 mt-2 leading-relaxed">{description}</p>
        </div>
    );
};

const FeaturesSection = () => {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-20 py-16 text-white bg-transparent">
            
            <div className="flex flex-wrap justify-center gap-8">
                <FeatureCard
                    icon="📄"
                    title="DSA Sheet"
                    description="Boost your DSA skills with our structured and powerful cheat sheet."
                    borderColor="border-sky-500"
                    textColor="text-sky-400"
                />
                <FeatureCard
                    icon="⚙️"
                    title="CS Subjects"
                    description="Explore CS fundamentals with simplified, digestible explanations."
                    borderColor="border-green-500"
                    textColor="text-green-400"
                />
                <FeatureCard
                    icon="📑"
                    title="Projects"
                    description="Enhance your portfolio and skills with impactful project ideas."
                    borderColor="border-pink-500"
                    textColor="text-pink-400"
                />
            </div>
        </section>
    );
};

export default FeaturesSection;
