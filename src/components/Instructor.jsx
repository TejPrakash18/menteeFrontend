import neha from '../assets/neha.jpg';
import tej from '../assets/tej1.webp';
// You can duplicate these or use other images
import user3 from '../assets/tej1.webp';
import user4 from '../assets/neha.jpg';

const InstructorCard = ({ image, name, description, badgeColor, borderColor, textColor }) => {
    return (
        <div className={`bg-[#1e1f2f] border-2 ${borderColor} rounded-xl w-72 p-6 relative text-white`}>
      <span className={`absolute top-0 right-0 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-bl-xl`}>
        Instructor
      </span>
            <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700" />
            <h3 className={`text-xl font-bold ${textColor}`}>{name}</h3>
            <p className="text-gray-400 font-medium text-sm mt-1">BCA</p>
            <p className="text-sm text-gray-300 mt-3">{description}</p>
        </div>
    );
};

const InstructorSection = () => {
    return (
        <section className="bg-black text-white p-16 text-center">
            <h2 className="text-3xl font-extrabold text-orange-400">INSTRUCTORS</h2>
            <p className="mt-2 text-lg text-gray-300">Meet Our Exceptional Instructors</p>

            <div className="flex justify-center gap-8 mt-10 flex-wrap">
                <InstructorCard
                    image={tej}
                    name="Tej Upadhyay"
                    description="As a lifelong learner and a collaborative team member."
                    badgeColor="bg-sky-500"
                    borderColor="border-sky-500"
                    textColor="text-sky-400"
                />
                <InstructorCard
                    image={neha}
                    name="Neha Varshney"
                    description="Always seeking opportunities to grow and contribute."
                    badgeColor="bg-pink-500"
                    borderColor="border-pink-500"
                    textColor="text-pink-400"
                />
                <InstructorCard
                    image={user3}
                    name="Laxman Singh"
                    description="Passionate about tech and mentoring future engineers."
                    badgeColor="bg-green-500"
                    borderColor="border-green-500"
                    textColor="text-green-400"
                />
                <InstructorCard
                    image={user4}
                    name="Vaishali Tomar"
                    description="Focused on delivering value through code and creativity."
                    badgeColor="bg-yellow-500"
                    borderColor="border-yellow-500"
                    textColor="text-yellow-400"
                />
            </div>
        </section>
    );
};

export default InstructorSection;
