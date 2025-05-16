import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import todo from '../assets/todo.svg'
import portfolio from '../assets/portfolio.svg'
import movie from '../assets/movie.svg'
import quiz from '../assets/quiz.svg'
import employee from '../assets/employees.svg'
import job from '../assets/jobPortal.svg'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects } from '../services/projectService';  // Adjust path accordingly



const Project = () => {
    
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        getAllProjects()
            .then(res => setProjects(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleClick = (id) => {
        navigate(`/projects/${id}`);
    };

     return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mx-18">
                {projects.map((proj, idx) => (
                    <div key={idx} onClick={() => handleClick(proj.id)} className="cursor-pointer">
                        <ProjectCard
                            iconBg="bg-indigo-400"
                            title={proj.projectTitle}
                        
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Project;
