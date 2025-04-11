import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const languages = [
    { name: 'Java', desc: 'Java compiler', icon: '☕', id: 'java' },
    { name: 'C++', desc: 'C++ compiler', icon: '💻', id: 'cpp' },
    { name: 'Python', desc: 'Python compiler', icon: '🐍', id: 'python' },
    { name: 'Javascript', desc: 'Javascript compiler', icon: '📜', id: 'javascript' },
    { name: 'C', desc: 'C compiler', icon: '🔣', id: 'c' },
];

export default function PlaygroundPage() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black px-4 py-10 md:px-16">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Create Playground</h1>
                    <p className="text-white mb-8 text-sm md:text-base">
                        Choose a compiler and start coding instantly.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {languages.map((lang) => (
                            <div
                                key={lang.id}
                                onClick={() => navigate(`/compiler/${lang.id}`)}
                                className="rounded-2xl shadow-sm hover:bg-blue-500 transition duration-300 p-5 flex items-center gap-4 cursor-pointer bg-gray-800"
                            >
                                <div className="text-3xl">{lang.icon}</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-orange-400">{lang.name}</h3>
                                    <p className="text-sm text-white">{lang.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
