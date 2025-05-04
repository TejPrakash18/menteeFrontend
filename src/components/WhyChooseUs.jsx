const WhyChooseUs = () => {
    return (
        <section className="bg-black text-white p-16 text-center">
            <h2 className="text-3xl font-extrabold text-orange-400">Why choose us?</h2>
            <p className="mt-2 text-lg font-semibold text-gray-300">
                Unlock Your Potential with Our Comprehensive Learning Approach
            </p>

            <div className="flex justify-center gap-8 mt-10 flex-wrap">
                {/* Card 1 */}
                <div className="bg-[#1e1f2f] border-2 border-indigo-500 rounded-xl w-80 p-6 relative text-white">
          <span className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl">
            Featured
          </span>
                    <h3 className="text-xl font-bold text-indigo-400">Expert-Crafted Learning</h3>
                    <p className="mt-3 text-sm text-gray-300">
                        Our team of accomplished engineers, with impressive coding profiles across various platforms, hails from top tech companies like Google, Amazon, Meta, and Microsoft. They also boast a proven track record of successful teaching.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-[#1e1f2f] border-2 border-green-500 rounded-xl w-80 p-6 relative text-white">
          <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl">
            Featured
          </span>
                    <h3 className="text-xl font-bold text-green-400">Structured Learning Path</h3>
                    <p className="mt-3 text-sm text-gray-300">
                        Master Data Structures & Algorithms (DSA), System Design, core subjects, and practical projects – all through premium blog posts and in-depth video solutions.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="bg-[#1e1f2f] border-2 border-red-500 rounded-xl w-80 p-6 relative text-white">
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-bl-xl">
            Featured
          </span>
                    <h3 className="text-xl font-bold text-red-400">Quality Content</h3>
                    <p className="mt-3 text-sm text-gray-300">
                        We prioritize quality content, offering in-depth explanations and a wider range of solved problems in both free and paid courses. Our focus is on developing problem-solving skills through intuitive video explanations.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
