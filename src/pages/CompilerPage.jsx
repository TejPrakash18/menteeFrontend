import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from "../components/Navbar";

const compilers = [
    { name: 'Java', icon: '☕', id: 'java' },
    { name: 'C++', icon: '💻', id: 'cpp' },
    { name: 'Python', icon: '🐍', id: 'python' },
    { name: 'JavaScript', icon: '🟨', id: 'javascript' },
    { name: 'C', icon: '📘', id: 'c' },
];

const CompilerPage = () => {
    const { langId } = useParams();
    const [selectedCompiler, setSelectedCompiler] = useState(langId || 'java');

    const currentCompiler = compilers.find(c => c.id === selectedCompiler);

    return (
        <>
            <Navbar />
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 bg-gray-900 text-white">
                <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
                    {compilers.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setSelectedCompiler(c.id)}
                            className={`p-2 rounded hover:bg-gray-700 ${selectedCompiler === c.id ? 'bg-gray-700' : ''}`}
                        >
                            {c.icon}
                        </button>
                    ))}
                </div>
                <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-sm font-bold mb-2">{currentCompiler?.name || 'Compiler'} Online Compiler</h2>
                        <textarea className="w-full h-64 bg-gray-800 text-green-300 p-2 rounded" />
                        <div className="flex mt-4 space-x-2">
                            <button className="bg-purple-600 px-4 py-2 rounded">Run</button>
                            <button className="bg-gray-700 px-4 py-2 rounded">Share</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex-1 bg-gray-800 p-2 rounded mb-4">
                            <h3 className="text-sm font-bold">Output</h3>
                            <p className="text-sm text-gray-400">Your output shows here...</p>
                        </div>
                        <div className="flex-1 bg-gray-800 p-2 rounded">
                            <h3 className="text-sm font-bold">Input</h3>
                            <input className="w-full bg-gray-700 text-white p-2 rounded" placeholder="Enter your input here..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CompilerPage;
