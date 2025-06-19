import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { FaJava, FaJs, FaPython } from 'react-icons/fa';
import { SiCplusplus, SiC } from 'react-icons/si';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

import notes from "../data/notes.json";

import Footer from "../components/Footer"

const compilers = [
  { name: 'Java', icon: <FaJava />, id: 'java', language: 'java', judge0_id: 62 },
  { name: 'C++', icon: <SiCplusplus />, id: 'cpp', language: 'cpp', judge0_id: 54 },
  { name: 'Python', icon: <FaPython />, id: 'python', language: 'py', judge0_id: 71 },
  { name: 'JavaScript', icon: <FaJs />, id: 'javascript', language: 'javascript', judge0_id: 63 },
  { name: 'C', icon: <SiC />, id: 'c', language: 'c', judge0_id: 50 },
];

const defaultCodeMap = {
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, Java!");
    // write your code here 
  }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
  cout << "Hello, C++!" << endl;
  // write your code here
  return 0;
}`,
  python: `print("Hello, Python!")
# write your code here`,
  javascript: `console.log("Hello, JavaScript!");
// write your code here`,
  c: `#include <stdio.h>

int main() {
  printf("Hello, C!\\n");
  // write your code here
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
  const langToCategory = {
    java: "Java",
    cpp: "Cpp",
    python: "Python",
    javascript: "JavaScript",
    c: "C"
  };

  const currentNotes = notes.find(note => note.category === langToCategory[selectedCompiler]);

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
          const { stdout, stderr, compile_output, time, memory } = result.data;

          let finalOutput = '';
          if (stdout) finalOutput += stdout;
          if (stderr) finalOutput += `\n🔴 Error:\n${stderr}`;
          if (compile_output) finalOutput += `\n⚠️ Compile Error:\n${compile_output}`;

          finalOutput += `\n\n⏱ Execution Time: ${time ?? 'N/A'}s\n📦 Memory: ${memory ?? 'N/A'} KB`;

          setOutputText(finalOutput || "No output.");
        }
      };

      getResult();
    } catch (error) {
      console.error("Execution error:", error);
      setOutputText("❌ Error running code.");
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    const file = new Blob([code], { type: 'text/plain' });
    const filename = `program.${currentCompiler?.language || 'txt'}`;

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
          toast.success("program saved successfully")
        } catch (err) {
          console.error("Save cancelled or failed:", err);
        }
      };
      saveFile();
    } else {
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
      <div className="h-[calc(95vh-4rem)] bg-[#0f1117] text-white rounded mt-3 mx-4 md:mx-20 flex flex-col shadow-lg overflow-hidden">
        <div className="flex bg-[#161821] px-4 py-2 space-x-3 items-center border-b border-gray-700 overflow-x-auto">
          {compilers.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCompiler(c.id);
                setCode(defaultCodeMap[c.id]);
                setOutputText('');
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded text-sm transition-all duration-200 ${
                selectedCompiler === c.id ? 'bg-blue-600' : 'hover:bg-blue-500'
              }`}
              title={c.name}
            >
              <span className="text-lg">{c.icon}</span>
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-3 gap-3">
          {/* Editor */}
          <div className="flex-1 flex flex-col bg-[#1a1b26] rounded p-4 shadow-md min-h-0">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">{currentCompiler?.name} Editor</h2>
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={handleRun}
                  className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded text-sm font-medium"
                >
                  {isLoading ? "Running..." : "Run"}
                </button>
              </div>
            </div>

            <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={currentCompiler.language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
              />
            </div>
          </div>

          {/* I/O Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="flex-1 bg-[#1a1b26] p-4 rounded-xl shadow-sm flex flex-col">
              <h3 className="text-md font-semibold mb-2">Input</h3>
              <textarea
                className="flex-1 bg-[#0f1117] text-white p-2 rounded resize-none border border-gray-700"
                placeholder="Enter input here if required..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <div className="flex-1 bg-[#1a1b26] p-4 rounded shadow-sm flex flex-col">
              <h3 className="text-md font-semibold mb-2">Output</h3>
              <pre className="flex-1 bg-[#0f1117] text-green-400 p-2 rounded overflow-y-auto text-sm whitespace-pre-wrap border border-gray-700">
                {isLoading ? "Running..." : outputText || "Your output will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {currentNotes && (
        <div className="bg-[#0f1117] text-gray-100 rounded shadow-lg my-6 mx-4 md:mx-20 p-6">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
            {currentNotes.title}
          </h2>
          {currentNotes.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-2xl font-semibold text-blue-400 mb-2">{section.title}</h3>

              {section.content && (
                <p className="mt-2 text-gray-300 leading-relaxed">{section.content}</p>
              )}

              {section.list && (
                <ul className="list-disc list-inside mt-3 text-gray-400 space-y-1">
                  {section.list.map((item, idx) => (
                    <li key={idx}>
                      <strong className="text-gray-200">{item.title}:</strong> {item.content}
                    </li>
                  ))}
                </ul>
              )}

              {section.steps && (
                <ol className="list-decimal list-inside mt-3 text-gray-400 space-y-1">
                  {section.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              )}

{section.code?.trim() && (
  <div className="mt-4 rounded overflow-x-auto text-sm">
    <SyntaxHighlighter language="java" style={dracula} customStyle={{ padding: '1rem', borderRadius: '0.5rem' }}>
      {section.code}
    </SyntaxHighlighter>
  </div>
)}


              {section.tips && (
                <ul className="list-disc list-inside mt-3 text-gray-400 space-y-1">
                  {section.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span>💡</span> {tip}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      <Footer />
    </>
  );
};

export default CompilerPage;
