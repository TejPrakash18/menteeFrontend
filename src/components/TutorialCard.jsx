const IconCard = ({ icon, title, bgColor = "bg-[#2A2B30]" }) => {
    return (
        <div
            className={`w-full sm:w-[250px] p-4 sm:p-6 rounded-xl shadow-lg text-white ${bgColor} transition-all duration-300 hover:scale-105 ring-1 ring-amber-200 `}
        >
            <div className="flex items-center gap-4">
                <div className="text-3xl text-sky-400 shrink-0">
                    <img src={icon} alt={title} className="w-16 h-16 object-contain" />
                </div>
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                </div>
            </div>
        </div>
    );
};
export default IconCard;