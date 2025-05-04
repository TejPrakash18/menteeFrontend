const SidebarProfile = () => {
    return (
        <div className="bg-[#1D1C20] text-white lg:w-100 lg:h-121 p-6 mt-5 rounded-2xl shadow-md">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src="https://i.pravatar.cc/150"
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                />
                <div>
                    <h2 className="text-lg font-bold">Neha Varshney</h2>
                    <p className="text-sm text-gray-400">@nehu07</p>
                </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2 text-sky-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        'C++', 'Git', 'GitHub Actions', 'Java',
                        'JavaScript', 'PostgreSQL', 'Spring Boot',
                    ].map(skill => (
                        <span
                            key={skill}
                            className="bg-[#2A2B30] px-3 py-1 text-xs rounded-full whitespace-nowrap"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Personal Info */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2 text-sky-400">Personal Information</h3>
                <div className="text-sm space-y-2 py-5">
                    <p><span className="text-gray-400">📧</span> nehavarshney355@gmail.com</p>
                    <p><span className="text-gray-400">🎓</span> Gagan College of Management and Technology</p>
                    <p><span className="text-gray-400">📍</span> Hathras</p>
                </div>
            </div>

        </div>
    );
};

export default SidebarProfile;
