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
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');

    const currentCompiler = compilers.find(c => c.id === selectedCompiler);

    return (
        <>
            <Navbar />
            <div className="h-screen flex flex-col bg-gray-900 text-white">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
                        {compilers.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedCompiler(c.id)}
                                className={`p-2 rounded hover:bg-blue-700 ${selectedCompiler === c.id ? 'bg-blue-700' : ''}`}
                            >
                                {c.icon}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 flex flex-col space-y-4">
                        {/* Input and Output Blocks */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Input */}
                            <div className="bg-gray-800 p-3 rounded">
                                <h3 className="text-sm font-bold mb-2">Input</h3>
                                <textarea
                                    className="w-full h-32 bg-gray-700 text-white p-2 rounded resize-none"
                                    placeholder="Enter multiline input..."
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                />
                            </div>

                            {/* Output */}
                            <div className="bg-gray-800 p-3 rounded">
                                <h3 className="text-sm font-bold mb-2">Output</h3>
                                <div className="w-full h-32 bg-gray-700 text-green-400 p-2 rounded overflow-y-auto text-sm">
                                    {outputText || "Your output shows here..."}
                                </div>
                            </div>
                        </div>

                        {/* Code Editor and Actions */}
                        <div className="flex-1">
                            <h2 className="text-sm font-bold mb-2">{currentCompiler?.name || 'Compiler'} Online Compiler</h2>
                            <textarea className="w-full h-80 bg-gray-800 text-green-300 p-2 rounded" />
                            <div className="flex mt-4 space-x-2">
                                <button className="bg-orange-600 px-4 py-2 rounded">Run</button>
                                <button className="bg-gray-700 px-4 py-2 rounded">Share</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompilerPage;
