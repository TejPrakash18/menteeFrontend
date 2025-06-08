import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, markProjectComplete } from '../services/projectService';
import Navbar from '../components/Navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [visitedCodeSections, setVisitedCodeSections] = useState(new Set());
  const [codeSectionIndices, setCodeSectionIndices] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    getProjectById(id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setProject(data);

        const codeIndices = data.sections
          ?.map((s, index) => (s.language ? index : null))
          .filter(index => index !== null);
        setCodeSectionIndices(codeIndices);
      })
      .catch(err => console.error(err));
  }, [id]);

  const conclusionIndex = project?.sections?.findIndex(section =>
    section.title.toLowerCase().includes('conclusion')
  );

  const allCodeSectionsVisited =
    codeSectionIndices.length > 1 &&
    codeSectionIndices.every(index => visitedCodeSections.has(index));

  const handleTopicClick = (index) => {
    setSelectedSectionIndex(index);

    const section = project.sections?.[index];
    if (section?.language && !visitedCodeSections.has(index)) {
      setVisitedCodeSections(prev => new Set(prev).add(index));
    }

    setTimeout(() => {
      sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  const handleMarkComplete = async () => {
    const username = localStorage.getItem('username');
    if (!username || username === 'undefined') {
      alert('User not logged in.');
      return;
    }
    if (!project || !project.projectTitle) {
      alert('Project data not loaded.');
      return;
    }
    try {
      await markProjectComplete(username, project.projectTitle);
      alert('Marked as Complete!');
      setCompleted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to mark as complete. Try again.');
    }
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-yellow-500 text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen p-15 rounded-2xl">
        <aside className="w-64 h-160 bg-[#1e1e22] p-4 rounded-2xl">
          <h2 className="text-lg font-bold mb-4 text-orange-400 m-5 rounded-2xl">Documentation</h2>
          <ul className="space-y-2">
            {project.sections?.map((section, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleTopicClick(idx)}
                  className={`block w-full text-left px-3 py-2 rounded-md font-medium ${
                    selectedSectionIndex === idx
                      ? 'bg-orange-400 text-white'
                      : 'text-orange-300 hover:bg-yellow-200'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-6 space-y-6 bg-[#1e1e22] rounded-2xl ml-10">
          <header className="bg-blue-400 p-6 rounded-xl shadow-lg text-white">
            <h1 className="text-2xl font-bold">{project.projectTitle}</h1>
            <p className="mt-2">{project.description}</p>
          </header>

          <section className="bg-[#2c2c2e] p-4 rounded-md shadow-md flex justify-between items-center">
            <div className="text-orange-400 font-semibold">
              Difficulty: {project.difficulty || 'N/A'}
            </div>
            <div className="text-white">
              <span className="font-semibold text-orange-400">Technologies:</span>{' '}
              {project.technologies?.length > 0
                ? project.technologies.join(', ')
                : 'No technologies listed'}
            </div>
          </section>

          {project.sections && project.sections[selectedSectionIndex] && (
            <section
              key={selectedSectionIndex}
              ref={el => (sectionRefs.current[selectedSectionIndex] = el)}
              className="bg-[#2c2c2e] p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold text-orange-400 mb-3">
                {project.sections[selectedSectionIndex].title}
              </h2>
              {project.sections[selectedSectionIndex].description && (
                <p className="text-white italic mb-4">
                  {project.sections[selectedSectionIndex].description}
                </p>
              )}
              {project.sections[selectedSectionIndex].language ? (
                <SyntaxHighlighter
                  language={project.sections[selectedSectionIndex].language}
                  style={dracula}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    backgroundColor: '#0f0f0f',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    overflowX: 'auto',
                    color: 'white',
                  }}
                >
                  {project.sections[selectedSectionIndex].content}
                </SyntaxHighlighter>
              ) : (
                <p className="text-gray-300 whitespace-pre-wrap">
                  {project.sections[selectedSectionIndex].content}
                </p>
              )}

              {selectedSectionIndex === conclusionIndex && allCodeSectionsVisited && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={handleMarkComplete}
                    disabled={completed}
                    className={`px-8 py-3 rounded-full text-white font-bold shadow-md transition-all duration-300 ${
                      completed
                        ? 'bg-green-500 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                  >
                    {completed ? 'Completed' : 'Mark as Done'}
                  </button>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default ProjectDetailPage;
