import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, markProjectComplete } from '../services/projectService';
import Navbar from '../components/Navbar';


const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [completed, setCompleted] = useState(false); // ✅ Add this line

  useEffect(() => {
    getProjectById(id)
      .then(res => {
        console.log('Fetched project:', res.data);
        if (Array.isArray(res.data)) {
          setProject(res.data[0]);
        } else {
          setProject(res.data);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

const handleMarkComplete = async () => {
  const username = localStorage.getItem('username');

  if (!username || username === 'undefined') {
    alert('User not logged in. Username is missing in localStorage.');
    return;
  }

  if (!project || !project.projectTitle) {
    alert('Project data not loaded yet.');
    return;
  }

  try {
    await markProjectComplete(username, project.projectTitle);
    alert('Marked as Complete!');
    setCompleted(true);
  } catch (err) {
    console.error('Error marking project complete:', err);
    alert('Failed to mark as complete. Please try again.');
  }
};



  if (!project) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-indigo-600 text-xl font-semibold animate-pulse">Loading...</div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Project Title and Description */}
        <header className="bg-indigo-400 p-8 rounded-xl shadow-lg text-white">
          <h1 className="text-2xl font-semibold drop-shadow-lg">{project.projectTitle}</h1>
          <p className="mt-4 text-lg tracking-wide">{project.description}</p>
        </header>

        {/* Difficulty & Technologies */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white rounded-xl shadow-md p-6">
  <div className="text-indigo-700 font-semibold text-lg">
    <span className="tracking-wide">Difficulty:</span>{' '}
    {project.difficulty ? project.difficulty : 'N/A'}
  </div>
  <div className="text-gray-700 font-medium text-lg max-w-xl text-center md:text-left">
    <span className="tracking-wide text-indigo-600 font-semibold">Technologies:</span>{' '}
    {project.technologies?.length > 0 ? project.technologies.join(', ') : 'No technologies listed'}
  </div>
</section>


        {/* Sections */}
        <section className="space-y-6">
          {project.sections?.length > 0 ? (
            project.sections.map((section, idx) => (
              <article
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-3xl font-semibold text-indigo-800 mb-3 border-b border-indigo-300 pb-1">
                  {section.title}
                </h3>
                {section.description && (
                  <p className="mb-4 text-gray-600 italic">{section.description}</p>
                )}
                {section.language ? (
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre-wrap text-indigo-900">
                    {section.content}
                  </pre>
                ) : (
                  section.content && <p className="text-gray-800 whitespace-pre-wrap">{section.content}</p>
                )}
              </article>
            ))
          ) : (
            <p className="text-center text-gray-500 italic">No sections available.</p>
          )}
        </section>

        {/* Mark Complete Button */}
        <div className="flex justify-center">
                  <button
  onClick={handleMarkComplete}
  disabled={completed}
  className={`px-6 py-2 rounded-md text-white font-semibold ${
    completed ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
  }`}
>
  {completed ? 'Completed' : 'Mark as Complete'}
</button>


        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
