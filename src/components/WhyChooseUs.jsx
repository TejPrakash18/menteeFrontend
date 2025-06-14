import React from 'react';

const colorClasses = {
  indigo: {
    border: 'border-indigo-500',
    bg: 'bg-indigo-500',
    text: 'text-indigo-400',
  },
  green: {
    border: 'border-green-500',
    bg: 'bg-green-500',
    text: 'text-green-400',
  },
  red: {
    border: 'border-red-500',
    bg: 'bg-red-500',
    text: 'text-red-400',
  },
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Expert-Crafted Learning",
      color: "indigo",
      description:
        "Our team of accomplished engineers from top tech companies (Google, Amazon, Meta, Microsoft) deliver expert-level insights and guidance.",
    },
    {
      title: "Structured Learning Path",
      color: "green",
      description:
        "Master DSA, System Design, CS core subjects, and projects through curated blogs and video solutions.",
    },
    {
      title: "Quality Content",
      color: "red",
      description:
        "In-depth explanations, solved problems, and intuitive video walkthroughs designed to build real problem-solving skills.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text mb-6">
          Why Choose Us?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-14">
          Unlock Your Potential with Our Comprehensive Learning Approach
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => {
            const { border, bg, text } = colorClasses[feature.color];

            return (
              <div
                key={index}
                className={`relative bg-white/5 ${border} rounded-2xl w-full max-w-xs sm:w-[20rem] p-6 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 group`}
              >
                <span
                  className={`absolute top-0 right-0 ${bg} text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl`}
                >
                  Featured
                </span>
                <h3
                  className={`text-xl font-bold ${text} mb-2`}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
