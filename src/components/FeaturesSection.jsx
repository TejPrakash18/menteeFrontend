const FeatureCard = ({ icon, title, description, borderColor, textColor }) => {
    return (
        <div className={`bg-gray-800 border-2 ${borderColor} rounded-xl w-72 p-6 relative text-white shadow-lg`}>
            <div className={`text-5xl mb-4 ${textColor}`}>{icon}</div>
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
            <p className="text-sm text-gray-300 mt-3">{description}</p>
        </div>
    );
};

const FeaturesSection = () => {
    return (
        <section className=" text-white p-16 text-center">
            <div className="flex justify-center gap-8 mt-10 flex-wrap">
                <FeatureCard
                    icon="📄"
                    title="DSA Sheet"
                    description="Boost your DSA skill with our handy cheat sheet"
                    borderColor="border-sky-500"
                    textColor="text-sky-400"
                />
                <FeatureCard
                    icon="⚙️"
                    title="CS Subjects"
                    description="Demystify CS topics with our easy-to-understand guide"
                    borderColor="border-green-500"
                    textColor="text-green-400"
                />
                <FeatureCard
                    icon="📑"
                    title="Projects"
                    description="Enhance your development skills with these engaging blogs"
                    borderColor="border-pink-500"
                    textColor="text-pink-400"
                />
            </div>
        </section>
    );
};

export default FeaturesSection;
