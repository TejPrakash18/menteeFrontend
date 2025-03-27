// import

const InstructorCard = ({ image, name }) => {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-80 text-center">
        <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h3 className="text-xl font-bold text-orange-400">{name}</h3>
        <p className="text-gray-300">BCA |</p>
      </div>
    );
  };
  
  const InstructorSection = () => {
    return (
      <section className="bg-gray-900 text-white p-16 text-center">
        <h2 className="text-3xl font-extrabold text-orange-400">INSTRUCTOR</h2>
        <p className="mt-2 text-lg text-gray-300">Meet Our Exceptional Instructor</p>
        <div className="flex justify-center gap-8 mt-8 flex-wrap">
          <InstructorCard image="/tej.jpg" name="Tej Upadhyay" />
          <InstructorCard image="/neha.jpg" name="Neha Varshney" />
        </div>
      </section>
    );
  };
  export default InstructorSection;