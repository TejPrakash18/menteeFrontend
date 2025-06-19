  import { useParams } from 'react-router-dom';
  import { useState, useEffect } from 'react';
  import Editor from "@monaco-editor/react";
  import axios from "axios";
  import { getQuestionById, markDSAComplete } from '../services/dsaService';
  import Navbar from '../components/Navbar';

  import Footer from '../components/Footer';
import { toast } from 'sonner';

  const compilers = [
    { name: 'Java', id: 'java', language: 'java', judge0_id: 62 },
    { name: 'C++', id: 'cpp', language: 'cpp', judge0_id: 54 },
    { name: 'Python', id: 'python', language: 'python', judge0_id: 71 },
    { name: 'JavaScript', id: 'javascript', language: 'javascript', judge0_id: 63 },
  ];

  const defaultCodeMap = {
    java: `public class Main {
      // write your methods here
      public static void main(String[] args) {
          // call your methods here
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
    const [inputText, setInputText] = useState('');
    const [execTime, setExecTime] = useState(null);
    const [memoryUsage, setMemoryUsage] = useState(null);

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

    const getDifficultyColor = (difficulty) => {
      switch (difficulty?.toLowerCase()) {
        case 'basic':
          return 'text-green-500';
        case 'easy':
          return 'text-yellow-400';
        case 'medium':
          return 'text-red-500';
        default:
          return 'text-gray-400';
      }
    };

    const handleMarkComplete = () => {
      const username = localStorage.getItem('username');

      if (!username) {
        // alert('You must be logged in to submit. Please log in.');
        toast.warning("you must be logged in to submit. Please log in.")
        return;
      }

      if (!question || !question.title) {
        // alert('Question not loaded yet.');
        toast.warning("Question not loaded yet.")
        return;
      }

      if (!outputText) {
        // alert("Please run your code first.");
        toast.warning("Please run your code first")
        return;
      }

      const cleanedOutput = outputText.trim();
      const expectedOutput = (question.expected_output || "").trim();

      if (cleanedOutput === expectedOutput) {
        markDSAComplete(username, question.title)
          .then(() => {
            // alert('Question marked as complete!');
            toast.success("Question marked as complete!")
            setIsCompleted(true);
          })
          .catch(err => {
            console.error(err);
            // alert('Error marking as complete.');
            toast.warning("Error marking as complete.")
          });
      } else {
        // alert(`Your output doesn't match the expected output.\nExpected: ${expectedOutput}\nGot: ${cleanedOutput}`);
        toast.warning(`Your output doesn't match the expected output.\nExpected: ${expectedOutput}\nGot: ${cleanedOutput}`)
      }
    };

    const handleRun = async () => {
      if (!currentCompiler) return;
      setIsLoading(true);
      setOutputText("Running...");
      setExecTime(null);
      setMemoryUsage(null);

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
            const resData = result.data;
            setOutputText(resData.stdout || resData.stderr || resData.compile_output || "No output.");
            setExecTime(resData.time ? `${resData.time} sec` : null);
            setMemoryUsage(resData.memory ? `${(resData.memory / 1024).toFixed(2)} KB` : null);
          }
        };

        checkResult();
      } catch (error) {
        console.error("Execution error:", error);
        setOutputText("Error running code.");
        setIsLoading(false);
      }
    };

    const inputOutputBoxClass = `
      bg-[#1f1f23]
      border border-gray-600
      rounded-lg
      p-4
      font-mono
      text-sm
      text-white
      overflow-auto
      max-h-48
      resize-none
      shadow-md
      focus:outline-none
      focus:ring-2
      focus:ring-orange-500
      transition
      duration-200
    `;

    const labelClass = "flex items-center gap-2 text-orange-400 font-semibold mb-2";

    return (
      <>
        <Navbar />

        <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f] text-white overflow-hidden p-4 md:p-6 rounded-2xl mx-2 md:mx-10 mt-4 gap-4">

          {/* Left Panel */}
          <div className="w-full md:w-[40%] p-4 bg-[#1e1e22] border border-gray-700 rounded-xl overflow-y-auto h-[90vh]">
            {question ? (
              <>
                <h1 className="text-2xl font-bold text-orange-400 mb-2">{question.title}</h1>
                <p className={`text-sm mb-4 font-semibold ${getDifficultyColor(question.difficulty)}`}>
                  Difficulty: {question.difficulty}
                </p>
                <p className="text-gray-200 whitespace-pre-line">{question.explanation}</p>

                <h3 className="text-lg font-semibold mt-6 text-orange-300">Examples:</h3>
                {question.examples?.length > 0 ? (
                  question.examples.map((ex, idx) => (
                    <div key={idx} className="bg-[#2a2a2d] p-3 rounded-md mt-2">
                      <p><span className="text-green-400">Input:</span> {ex.input}</p>
                      <p><span className="text-blue-400">Output:</span> {ex.output}</p>
                    </div>
                  ))
                ) : (
                  <p>No examples provided.</p>
                )}

                {question.expected_output && (
                  <p className="mt-4 text-green-400 text-sm">Expected Output: {question.expected_output}</p>
                )}

                {question.solution && (
                  <>
                    <h2 className="text-lg font-semibold mt-6 text-orange-300">Solution:</h2>
                    <p className="text-gray-300">{question.solution}</p>
                  </>
                )}
              </>
            ) : (
              <p>Loading question...</p>
            )}
          </div>

          {/* Right Panel */}
          <div className="w-full md:w-[60%] flex flex-col gap-4">

            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center gap-2 sticky top-0 bg-[#0f0f0f] z-10 p-2 rounded-xl border border-gray-700">
              <select
                value={selectedCompiler}
                onChange={(e) => {
                  setSelectedCompiler(e.target.value);
                  setCode(defaultCodeMap[e.target.value]);
                }}
                className="bg-[#2c2c2e] text-white p-1.5 rounded text-sm w-28"
              >
                {compilers.map((compiler) => (
                  <option key={compiler.id} value={compiler.id}>{compiler.name}</option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={handleMarkComplete}
                  disabled={isCompleted || !localStorage.getItem('username')}
                  className={`px-3 py-1.5 rounded transition text-sm ${
                    isCompleted ? 'bg-green-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                  style={{ minHeight: '32px' }}
                >
                  {isCompleted ? "Completed" : "Submit"}
                </button>

                <button
                  onClick={handleRun}
                  className="bg-orange-600 hover:bg-orange-700 px-3 py-1.5 rounded transition text-sm"
                  style={{ minHeight: '32px' }}
                >
                  {isLoading ? "Running..." : "Run"}
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="h-[370px] md:h-[390px] border border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={currentCompiler.language}
                value={code}
                onChange={(val) => setCode(val || '')}
                theme="vs-dark"
              />
            </div>

            {/* Input & Output Side by Side */}
            <div className="flex gap-4">

              {/* Input */}
              <div className="flex flex-col w-1/2">
                <label htmlFor="inputText" className={labelClass}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Input (stdin)
                </label>
                <textarea
                  id="inputText"
                  className={inputOutputBoxClass}
                  placeholder="Enter input here..."
                  rows={6}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              {/* Output */}
              <div className="flex flex-col w-1/2">
                <label htmlFor="outputText" className={labelClass}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Output
                </label>
                <pre
                  id="outputText"
                  className={`${inputOutputBoxClass} whitespace-pre-wrap`}
                  style={{ minHeight: '153px', userSelect: 'text' }}
                >
                  {outputText || "Your output will appear here..."}
                  {(execTime || memoryUsage) && (
                  <div className="mt-20 text-green-400 text-sm flex gap-4 justify-end">
                    {execTime && <span>⏱️ Time: {execTime}</span>}
                    {memoryUsage && <span>🧠 Memory: {memoryUsage}</span>}
                  </div>
                )}
                </pre>
                
              </div>
            </div>

          </div>
        </div>

        <Footer/>
      </>
    );
  };

  export default DSADetailPage;
    