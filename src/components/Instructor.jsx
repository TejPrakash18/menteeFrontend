import neha from '../assets/neha.jpg';
import tej from '../assets/tej1.webp';
import vaishali from '/avatar6.png';

const InstructorCard = ({ image, name, description, badgeColor, role, borderColor, textColor }) => {
  return (
    <div className={`bg-[#1e1f2f] border-t-4 ${borderColor} rounded-xl p-5 sm:p-6 text-white shadow-md hover:scale-[1.01] transition-transform duration-300 relative w-full`}>
      <span className={`absolute top-0 right-0 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl`}>
        {role}
      </span>
      <img
        src={image}
        alt={name}
        className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full object-cover border-2 border-gray-700 shadow-md"
      />
      <h3 className={`text-lg sm:text-xl font-bold ${textColor} text-center`}>{name}</h3>
      <p className="text-sm text-gray-400 font-medium text-center">BCA</p>
      <p className="text-sm text-gray-300 mt-2 text-center leading-relaxed">{description}</p>
    </div>
  );
};

const InstructorSection = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-4 sm:px-6 lg:px-2">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 text-transparent bg-clip-text mb-4">
          Instructor
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 font-medium mb-10">
          Meet Our Exceptional Instructors
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InstructorCard
            image={tej}
            name="Tej Upadhyay"
            description="Specialist in Java, Spring-boot and scalable architecture. Loves teaching and building side-projects."
            badgeColor="bg-sky-500"
            role="Backend Developer"
            borderColor="border-sky-500"
            textColor="text-sky-400"
          />
          <InstructorCard
            image={neha}
            name="Neha Varshney"
            description="Focuses on teaching frontend technology, Clean Architecture, and high-performance UIs."
            badgeColor="bg-pink-500"
            role="Frontend Developer"
            borderColor="border-pink-500"
            textColor="text-pink-400"
          />
          <InstructorCard
            image={vaishali}
            name="Vaishali Tomar"
            description="Always seeking opportunities to grow and contribute."
            badgeColor="bg-sky-500"
            role="Mentor"
            borderColor="border-sky-500"
            textColor="text-sky-400"
          />
          <InstructorCard
            image={vaishali}
            name="Laxman Singh"
            description="Motivated mentor and tech enthusiast focused on continuous learning and student success."
            badgeColor="bg-pink-500"
            role="Mentor"
            borderColor="border-pink-500"
            textColor="text-pink-400"
          />
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
