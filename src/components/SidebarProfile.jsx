import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import userService from '../services/userService';

const SidebarProfile = () => {
    const [profile, setProfile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('username');
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                setProfile(data);
                if (username && username !== 'undefined') {
                    const avatar = await userService.getAvatar(username);
                    console.log("fetched profile ", avatar);
                    setAvatarUrl(avatar);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setProfile(prev => ({
                ...prev,
                skills: [...(prev.skills || []), newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const handleSave = async () => {
        try {
            await userService.updateProfile(profile);
            setShowModal(false);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

    if (!profile) return <p className="text-white p-5">Loading profile...</p>;

    return (
        <div className="bg-[#1D1C20] text-white lg:w-100 lg:h-115  p-5 mt-6 rounded-md shadow-md">
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
                <img
                    src={avatarUrl || 'avatar6.png'}
                    alt="Profile"
                    className="w-16 h-16 rounded-full"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/avatar6.png';
                    }}
                />
                <div>
                    <h2 className="text-lg font-bold">{profile.name}</h2>
                    <p className="text-sm text-gray-400">{profile.username}</p>
                </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2 text-sky-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                    {(profile.skills || []).map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-blue-400 px-3 py-1 text-xs rounded whitespace-nowrap"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Personal Info */}
            <div className="mb-2">
                <h3 className="text-md font-semibold mb-1 text-sky-400">Personal Information</h3>
                <div className="text-sm space-y-2 py-1">
                    <p>
                        <span className="text-gray-400">Email: </span> {profile.email}
                    </p>
                    <p>
                        <span className="text-gray-400">College: </span> {profile.college}
                    </p>
                    <p>
                        <span className="text-gray-400">Education: </span> {profile.education}
                    </p>
                    <p>
                        <span className="text-gray-400">Location: </span> {profile.location}
                    </p>
                </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end">
                <button
          onClick={() => setShowModal(true)}
          className="p-2 rounded-full bg-[#2A2B30] hover:bg-[#3B3C42] border border-gray-700 transition"
          title="Edit Profile"
        >
          <Pencil size={16} className="text-white" />
        </button>
            </div>

            {/* Modal Dialog for Editing */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-[#1D1C20] text-white p-6 rounded-xl w-11/12 md:w-1/2 lg:w-1/3 shadow-lg">
                        <h2 className="text-xl mb-4 font-semibold">Edit Profile</h2>

                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            className="bg-[#2A2B30] text-white p-2 rounded w-full mb-3"
                            value={profile.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />

                        <label className="block mb-2">College:</label>
                        <input
                            type="text"
                            className="bg-[#2A2B30] text-white p-2 rounded w-full mb-3"
                            value={profile.college}
                            onChange={(e) => handleInputChange('college', e.target.value)}
                        />

                        <label className="block mb-2">Education:</label>
                        <input
                            type="text"
                            className="bg-[#2A2B30] text-white p-2 rounded w-full mb-3"
                            value={profile.education}
                            onChange={(e) => handleInputChange('education', e.target.value)}
                        />

                        <label className="block mb-2">Location:</label>
                        <input
                            type="text"
                            className="bg-[#2A2B30] text-white p-2 rounded w-full mb-3"
                            value={profile.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />

                        {/* Skill Editing */}
                        <label className="block mt-4 mb-2">Add Skill:</label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                placeholder="Add a skill"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                className="bg-[#2A2B30] text-white p-2 rounded w-full"
                            />
                            <button
                                onClick={handleAddSkill}
                                className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded text-sm"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {(profile.skills || []).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-[#2A2B30] px-3 py-1 text-xs rounded-full whitespace-nowrap"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarProfile;
