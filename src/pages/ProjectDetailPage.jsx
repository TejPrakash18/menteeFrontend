import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, markProjectComplete } from '../services/projectService';
import Navbar from '../components/Navbar';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

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


  const handleMarkComplete = () => {
    if (!project || !project.projectTitle) {
      alert('Project data not loaded yet.');
      return;
    }
    markProjectComplete('tej22', project.projectTitle) // Replace 'tej22' as needed
      .then(() => alert('Marked as Complete!'))
      .catch(err => console.error(err));
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
        <header className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 p-8 rounded-xl shadow-lg text-white">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">{project.projectTitle}</h1>
          <p className="mt-4 text-lg tracking-wide">{project.description}</p>
        </header>

        {/* Difficulty & Technologies */}
      <section className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white rounded-xl shadow-md p-6">
  <div className="text-indigo-700 font-semibold text-lg">
    <span className="uppercase tracking-wide">Difficulty:</span>{' '}
    {project.difficulty ? project.difficulty : 'N/A'}
  </div>
  <div className="text-gray-700 font-medium text-lg max-w-xl text-center md:text-left">
    <span className="uppercase tracking-wide text-indigo-600 font-semibold">Technologies:</span>{' '}
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
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800
                       text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Mark as Complete
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
