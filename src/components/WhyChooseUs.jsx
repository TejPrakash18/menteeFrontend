const WhyChooseUs = () => {
    return (
        <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text mb-4">
                    Why Choose Us?
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto">
                    Unlock Your Potential with Our Comprehensive Learning Approach
                </p>

                <div className="flex flex-wrap justify-center gap-8">
                    {/* Card 1 */}
                    <div className="bg-[#1e1f2f] border-t-4 border-indigo-500 rounded-2xl w-full sm:w-[20rem] p-6 relative shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl">
                            Featured
                        </span>
                        <h3 className="text-xl font-bold text-indigo-400 mb-2">
                            Expert-Crafted Learning
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Our team of accomplished engineers from top tech companies (Google, Amazon, Meta, Microsoft) deliver expert-level insights and guidance.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1e1f2f] border-t-4 border-green-500 rounded-2xl w-full sm:w-[20rem] p-6 relative shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl">
                            Featured
                        </span>
                        <h3 className="text-xl font-bold text-green-400 mb-2">
                            Structured Learning Path
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Master DSA, System Design, CS core subjects, and projects through curated blogs and video solutions.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1e1f2f] border-t-4 border-red-500 rounded-2xl w-full sm:w-[20rem] p-6 relative shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl">
                            Featured
                        </span>
                        <h3 className="text-xl font-bold text-red-400 mb-2">
                            Quality Content
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            In-depth explanations, solved problems, and intuitive video walkthroughs designed to build real problem-solving skills.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
