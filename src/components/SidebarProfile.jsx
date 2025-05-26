import { useEffect, useState } from 'react';
import userService from '../services/userService';


const SidebarProfile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);
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
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile", error);
        }
    };

   

    if (!profile) return <p className="text-white p-5">Loading profile...</p>;

    return (
        <div className="bg-[#1D1C20] text-white lg:w-100 lg:h-121 p-6 mt-5 rounded-2xl shadow-md">
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
                    {editing ? (
                        <input
                            type="text"
                            className="bg-[#2A2B30] text-white p-1 rounded"
                            value={profile.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    ) : (
                        <h2 className="text-lg font-bold">{profile.name}</h2>
                    )}
                    <p className="text-sm text-gray-400">@{profile.username}</p>
                </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2 text-sky-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                    {(profile.skills || []).map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-[#2A2B30] px-3 py-1 text-xs rounded-full whitespace-nowrap"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
                {editing && (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="bg-[#2A2B30] text-white p-1 rounded w-full"
                        />
                        <button
                            onClick={handleAddSkill}
                            className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 rounded"
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>

            {/* Personal Info */}
            <div className="mb-2">
                <h3 className="text-md font-semibold mb-1 text-sky-400">Personal Information</h3>
                <div className="text-sm space-y-2 py-1">
                    <p>
                        <span className="text-gray-400">Email: </span>{' '}
                        {profile.email}
                    </p>
                    <p>
                        <span className="text-gray-400">College: </span>{' '}
                        {editing ? (
                            <input
                                type="text"
                                className="bg-[#2A2B30] text-white p-1 rounded w-full"
                                value={profile.college}
                                onChange={(e) => handleInputChange('college', e.target.value)}
                            />
                        ) : (
                            profile.college
                        )}
                    </p>
                    <p>
                        <span className="text-gray-400">Education: </span>{' '}
                        {editing ? (
                            <input
                                type="text"
                                className="bg-[#2A2B30] text-white p-1 rounded w-full"
                                value={profile.education}
                                onChange={(e) => handleInputChange('education', e.target.value)}
                            />
                        ) : (
                            profile.education
                        )}
                    </p>
                    <p>
                        <span className="text-gray-400">Location: </span>{' '}
                        {editing ? (
                            <input
                                type="text"
                                className="bg-[#2A2B30] text-white p-1 rounded w-full"
                                value={profile.location}
                                onChange={(e) => handleInputChange('location', e.target.value)}
                            />
                        ) : (
                            profile.location
                        )}
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                {editing ? (
                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 mt-1 rounded"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    );
};

export default SidebarProfile;
