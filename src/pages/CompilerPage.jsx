import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import axios from "axios";

const compilers = [
    { name: 'Java', icon: 'Java', id: 'java', language: 'java', judge0_id: 62 },
    { name: 'C++', icon: 'CPP', id: 'cpp', language: 'cpp', judge0_id: 54 },
    { name: 'Python', icon: 'Py', id: 'python', language: 'python', judge0_id: 71 },
    { name: 'JavaScript', icon: 'JS', id: 'javascript', language: 'javascript', judge0_id: 63 },
    { name: 'C', icon: 'C', id: 'c', language: 'c', judge0_id: 50 },
];

const defaultCodeMap = {
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
    python: `print("Hello, Python!")`,
    javascript: `console.log("Hello, JavaScript!");`,
    c: `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,
};





const CompilerPage = () => {
    const { langId } = useParams();
    const [selectedCompiler, setSelectedCompiler] = useState(langId || 'java');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [code, setCode] = useState(defaultCodeMap[langId] || defaultCodeMap["java"]);
    const [isLoading, setIsLoading] = useState(false);

    const currentCompiler = compilers.find(c => c.id === selectedCompiler);

    const handleRun = async () => {
        if (!currentCompiler) return;

        setIsLoading(true);
        setOutputText("Running...");

        try {
            const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
                source_code: code,
                stdin: inputText,
                language_id: currentCompiler.judge0_id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    'X-RapidAPI-Key': '1415aba1b1msh545546e8d959045p1c9849jsnfe4c0ac5c221'
                }
            });

            const token = response.data.token;

            const getResult = async () => {
                const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                    headers: {
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'X-RapidAPI-Key': '1415aba1b1msh545546e8d959045p1c9849jsnfe4c0ac5c221'
                    }
                });

                if (result.data.status.id <= 2) {
                    setTimeout(getResult, 1000);
                } else {
                    setIsLoading(false);
                    setOutputText(result.data.stdout || result.data.stderr || result.data.compile_output || "No output.");
                }
            };

            getResult();
        } catch (error) {
            console.error("Execution error:", error);
            setOutputText("Error running code.");
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        const file = new Blob([code], { type: 'text/plain' });
        const filename = `program.${currentCompiler?.language || 'txt'}`;

        // Use the File System Access API if available (Chrome-based browsers)
        if (window.showSaveFilePicker) {
            const saveFile = async () => {
                try {
                    const handle = await window.showSaveFilePicker({
                        suggestedName: filename,
                        types: [{
                            description: 'Code Files',
                            accept: { 'text/plain': ['.java', '.cpp', '.py', '.js', '.c', '.txt'] },
                        }],
                    });

                    const writable = await handle.createWritable();
                    await writable.write(code);
                    await writable.close();
                } catch (err) {
                    console.error("Save cancelled or failed:", err);
                }
            };
            saveFile();
        } else {
            // Fallback for other browsers
            const element = document.createElement("a");
            element.href = URL.createObjectURL(file);
            element.download = filename;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
    };


    return (
        <>
            <Navbar />
            <div className="h-[calc(95vh-4rem)] flex bg-[#1c1c1e] text-white overflow-hidden rounded-2xl mt-3 mx-20">
                {/* Sidebar */}
                <div className="w-16 bg-[#1c1c1e] flex flex-col items-center py-4 space-y-4">
                    {compilers.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => {
                                setSelectedCompiler(c.id);
                                setCode(defaultCodeMap[c.id]); // Set default code
                                setOutputText('');
                            }}
                            className={`p-3 rounded hover:bg-blue-600 ${selectedCompiler === c.id ? 'bg-blue-700' : ''}`}
                        >
                            {c.icon}
                        </button>
                    ))}
                </div>

                {/* Main Area */}
                <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
                    {/* Code Editor Panel */}
                    <div className="flex-1 flex flex-col bg-black rounded-lg p-4 min-h-0">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{currentCompiler?.name} Editor</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleRun}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
                                >
                                    {isLoading ? "Running..." : "Run"}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 min-h-0 rounded-md overflow-hidden border border-gray-700">
                            <Editor
                                height="100%"
                                defaultLanguage={currentCompiler.language}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                theme="vs-dark"
                            />
                        </div>
                    </div>

                    {/* Input & Output Panel */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        {/* Input */}
                        <div className=" flex-1 bg-black p-4 rounded-lg flex flex-col">
                            <h3 className="text-md font-semibold mb-2">Input</h3>
                            <textarea
                                className="flex-1 bg-[#1c1c1e] text-white p-2 rounded resize-none"
                                placeholder="Enter multiline input..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                        </div>

                        {/* Output */}
                        <div className="flex-1 bg-black p-4 rounded-lg flex flex-col">
                            <h3 className="text-md font-semibold mb-2">Output</h3>
                            <div className="flex-1 bg-[#1c1c1e] text-orange-400 p-2 rounded overflow-y-auto text-sm whitespace-pre-wrap">
                                {isLoading ? "Running..." : outputText || "Your output shows here..."}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompilerPage;
