const ProjectCard = ({ icon, title, description, iconBg = "bg-gray-800" }) => {
    return (
        <div className="bg-[#1c1c1e] rounded-xl shadow-md p-6 text-white transition-all duration-300 hover:scale-102">
            <div className={`w-full h-36 flex items-center justify-center rounded-lg mb-4 ${iconBg}`}>
                <img src={icon} alt={title} className="w-16 h-16 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
};

export default ProjectCard;
