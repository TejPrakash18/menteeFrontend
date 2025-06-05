import neha from '../assets/neha.jpg';
import tej from '../assets/tej1.webp';
import vaishali from'/avatar6.png'

const InstructorCard = ({ image, name, description, badgeColor, borderColor, textColor }) => {
    return (
        <div className={`bg-[#1e1f2f] border-t-4 ${borderColor} rounded-2xl w-full sm:w-72 p-6 relative text-white shadow-lg`}>
            <span className={`absolute top-0 right-0 ${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded-bl-xl rounded-tr-xl
            `}>
                Instructor
            </span>
            <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700 shadow-md object-cover" />
            <h3 className={`text-xl font-bold ${textColor}`}>{name}</h3>
            <p className="text-sm text-gray-400 font-medium">BCA</p>
            <p className="text-sm text-gray-300 mt-3 leading-relaxed">{description}</p>
        </div>
    );
};

const InstructorSection = () => {
    return (
        <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white p-16 sm:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                    INSTRUCTORS
                </h2>
                <p className="mt-3 text-lg sm:text-xl text-gray-300 font-medium">
                    Meet Our Exceptional Instructors
                </p>

<div className="flex gap-8 mt-10 flex-nowrap justify-center items-stretch w-full overflow-hidden">

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
                        image={vaishali}
                        name="Vaishali Tomar"
                        description="Always seeking opportunities to grow and contribute."
                        badgeColor="bg-pink-500"
                        borderColor="border-pink-500"
                        textColor="text-pink-400"
                    />
                    <InstructorCard
                        image={vaishali}
                        name="Laxamn Singh"
                        description="Always seeking opportunities to grow and contribute."
                        badgeColor="bg-pink-500"
                        borderColor="border-pink-500"
                        textColor="text-pink-400"
                    />
                </div>
            </div>
        </section>
    );
};

export default InstructorSection;
