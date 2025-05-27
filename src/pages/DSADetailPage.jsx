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
      alert('You must be logged in to submit. Please log in.');
      return;
    }

    if (!question || !question.title) {
      alert('Question not loaded yet.');
      return;
    }

    if (!outputText) {
      alert("Please run your code first.");
      return;
    }

    const cleanedOutput = outputText.trim();
    const expectedOutput = (question.expected_output || "").trim();

    if (cleanedOutput === expectedOutput) {
      markDSAComplete(username, question.title)
        .then(() => {
          alert('Question marked as complete!');
          setIsCompleted(true);
        })
        .catch(err => {
          console.error(err);
          alert('Error marking as complete.');
        });
    } else {
      alert(`Your output doesn't match the expected output.\nExpected: ${expectedOutput}\nGot: ${cleanedOutput}`);
    }
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
      <Navbar />

      <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0f0f] text-white overflow-hidden p-4 md:p-6 rounded-2xl mx-2 md:mx-10 mt-4 gap-4">
        {/* Left Panel */}
        <div className="w-full md:w-[40%] p-4 bg-[#1e1e22] border border-gray-700 rounded-xl overflow-y-auto h-[90vh]">
          {question ? (
            <>
              <h1 className="text-2xl font-bold text-orange-400 mb-2">{question.title}</h1>
              <p className="text-sm text-gray-400 mb-4">Difficulty: {question.difficulty}</p>
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
              className="bg-[#2c2c2e] text-white p-2 rounded"
            >
              {compilers.map((compiler) => (
                <option key={compiler.id} value={compiler.id}>{compiler.name}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={handleMarkComplete}
                disabled={isCompleted || !localStorage.getItem('username')}
                className={`px-4 py-2 rounded transition ${
                  isCompleted ? 'bg-green-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {isCompleted ? "Completed" : "Submit"}
              </button>

              <button
                onClick={handleRun}
                className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded transition"
              >
                {isLoading ? "Running..." : "Run"}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="h-[400px] md:h-[420px] border border-gray-700 rounded-lg overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={currentCompiler.language}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
            />
          </div>

          {/* Output */}
          <div className="h-[150px] border border-gray-700 rounded-lg p-3 bg-[#1e1e22] overflow-y-auto">
            <h3 className="font-semibold text-white mb-2">Output:</h3>
            <pre className="text-sm text-orange-400 whitespace-pre-wrap">{outputText || "Your output will appear here..."}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default DSADetailPage;
