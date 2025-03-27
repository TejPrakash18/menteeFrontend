const WhyChooseUs = () => {
    return (
      <section className="bg-gray-900 text-white p-16 text-center">
        <h2 className="text-3xl font-extrabold text-orange-400">Why choose us?</h2>
        <p className="mt-2 text-lg font-semibold text-gray-300">Unlock Your Potential with Our Comprehensive Learning Approach</p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <div className="bg-gray-800 p-8 rounded-2xl w-96 text-left shadow-lg">
            <h3 className="text-xl font-extrabold text-orange-400">01 Expert-Crafted Learning</h3>
            <p className="mt-2 text-sm text-gray-300">
              Our team of accomplished engineers, with impressive coding profiles across various programming platforms, hails from top tech companies like Google, Amazon, Meta, and Microsoft. They also boast a proven track record of successful teaching.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl w-96 text-left shadow-lg">
            <h3 className="text-xl font-extrabold text-orange-400">02 Structured Learning Path</h3>
            <p className="mt-2 text-sm text-gray-300">
              Master Data Structures & Algorithms (DSA), System Design, core subjects, and practical projects – all through premium blog posts and in-depth video solutions.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-2xl w-96 text-left shadow-lg">
            <h3 className="text-xl font-extrabold text-orange-400">03 Structured Learning Path</h3>
            <p className="mt-2 text-sm text-gray-300">
              We prioritize quality content, offering in-depth explanations and a wider range of solved problems in both free and paid courses. Our focus is on developing problem-solving skills through intuitive video explanations.
            </p>
          </div>
        </div>
      </section>
    );
  };

  
  export default WhyChooseUs;