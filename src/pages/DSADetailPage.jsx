import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import axios from "axios";
import { getQuestionById, markDSAComplete } from '../services/dsaService';
import Navbar from '../components/Navbar';

const compilers = [
    { name: 'Java', id: 'java', language: 'java', judge0_id: 62 },
    { name: 'C++', id: 'cpp', language: 'cpp', judge0_id: 54 },
    { name: 'Python', id: 'python', language: 'python', judge0_id: 71 },
    { name: 'JavaScript', id: 'javascript', language: 'javascript', judge0_id: 63 },
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
};

const DSADetailPage = () => {
    const { id } = useParams();
    const [selectedCompiler, setSelectedCompiler] = useState('java');
    const [outputText, setOutputText] = useState('');
    const [code, setCode] = useState(defaultCodeMap['java']);
    const [isLoading, setIsLoading] = useState(false);
    const [question, setQuestion] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [inputText, setInputText] = useState(''); // Add this line if input is needed

    const currentCompiler = compilers.find(c => c.id === selectedCompiler);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await getQuestionById(id);
                const data = res.data;

                if (!data.examples && data.input && data.output) {
                    data.examples = [{ input: data.input, output: data.output }];
                }

                setQuestion(data);
            } catch (error) {
                console.error("Error fetching question:", error);
            }
        };

        fetchQuestion();
    }, [id]);

const handleMarkComplete = () => {
    const username = localStorage.getItem('username');

    if (!username) {
        alert('❌ You must be logged in to submit. Please log in.');
        return;
    }

    if (!question || !question.title) {
        alert('❌ Question not loaded yet.');
        return;
    }

    markDSAComplete(username, question.title)
        .then(() => {
            alert('✅ Question marked as complete!');
            setIsCompleted(true);
        })
        .catch(err => {
            console.error(err);
            alert('❌ Error marking as complete.');
        });
};


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
            let attempts = 0;
            const maxAttempts = 15;

            const checkResult = async () => {
                if (attempts >= maxAttempts) {
                    setIsLoading(false);
                    setOutputText("Timeout. Please try again.");
                    return;
                }

                attempts++;

                const result = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
                    headers: {
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                        'X-RapidAPI-Key': '1415aba1b1msh545546e8d959045p1c9849jsnfe4c0ac5c221'
                    }
                });

                if (result.data.status.id <= 2) {
                    setTimeout(checkResult, 1000);
                } else {
                    setIsLoading(false);
                    setOutputText(result.data.stdout || result.data.stderr || result.data.compile_output || "No output.");
                }
            };

            checkResult();
        } catch (error) {
            console.error("Execution error:", error);
            setOutputText("Error running code.");
            setIsLoading(false);
        }
    };

    return (
        <>
        
        <div className="flex h-screen bg-[#0f0f0f] text-white overflow-hidden p-3 rounded-2xl mx-20 mt-5">
            {/* Left panel: Question */}
            <div className="w-[40%] h-[87%] p-6 bg-[#1a1a1d] border-r border-gray-700 overflow-y-auto mt-18 rounded-2xl">
                {question ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold">{question.title}</h1>
                        <p className="text-sm text-gray-400">Difficulty: {question.difficulty}</p>
                        <p>{question.explanation}</p>

                        <h3 className="text-lg font-semibold mt-4">Examples:</h3>

                        {question.examples && question.examples.length > 0 ? (
                            question.examples.map((ex, index) => (
                                <div key={index} className="mb-2">
                                    <p><strong>Input:</strong> {ex.input}</p>
                                    <p><strong>Output:</strong> {ex.output}</p>
                                    <hr className="my-2" />
                                </div>
                            ))
                        ) : (
                            <p>No examples provided.</p>
                        )}

                        <p className="text-green-400 text-sm">Expected Output: {question.expected_output}</p>

                        {question.solution && (
                            <>
                                <h2 className="text-lg font-semibold">Solution:</h2>
                                <p>{question.solution}</p>
                            </>
                        )}
                    </div>
                ) : (
                    <p>Loading question...</p>
                )}
            </div>

            {/* Right panel: Editor & Output */}
<div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                {/* Toolbar */}
             {/* Toolbar */}
<div className="flex items-center justify-between">
    {/* Left: Language Selector */}
    <select
        value={selectedCompiler}
        onChange={(e) => {
            setSelectedCompiler(e.target.value);
            setCode(defaultCodeMap[e.target.value]);
        }}
        className="bg-[#2c2c2e] text-white p-2 rounded"
    >
        {compilers.map((compiler) => (
            <option key={compiler.id} value={compiler.id}>{compiler.name}</option>
        ))}
    </select>

    {/* Right: Buttons */}
    <div className="flex items-center space-x-2">
        <button
            onClick={handleMarkComplete}
            disabled={isCompleted || !localStorage.getItem('username')}
            className={`px-4 py-2 rounded ${isCompleted ? 'bg-green-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
        >
            {isCompleted ? "✅ Completed" : "Submit"}
        </button>

        <button
            onClick={handleRun}
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded"
        >
            {isLoading ? "Running..." : "Run"}
        </button>
    </div>
</div>

                {/* Editor */}
            <div className="flex-1 rounded-lg border border-gray-700 overflow-hidden">
    <Editor
        height="100%"
        defaultLanguage={currentCompiler.language}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
    />
</div>


                {/* Output */}
                <div className="bg-[#1c1c1e] p-4 rounded-lg" style={{ height: '150px' }}>
                    <h3 className="font-semibold mb-2">Output:</h3>
                    <div className="overflow-y-auto text-sm text-orange-400 whitespace-pre-wrap h-full">
                        {outputText || "Your output shows here..."}
                    </div>
                </div>
            </div>
        </div>

        <div>

        </div>
        </>
    );
};

export default DSADetailPage;
