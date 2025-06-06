const ProjectCard = ({ title, icon: Icon, iconBg = "bg-gray-800" }) => {
  return (
    <div className="bg-[#1c1c1e] rounded-xl shadow-md p-6 text-white transition-all duration-300 hover:scale-[1.02]">
      <div className={`w-full h-36 flex items-center justify-center rounded-lg mb-4 ${iconBg}`}>
        {Icon && <Icon className="text-white text-6xl" />}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
    </div>
  );
};

export default ProjectCard;
