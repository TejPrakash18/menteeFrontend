import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects, getCompletedProjects } from '../services/projectService';
import { GrNotes } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
import { FaPortrait, FaUserTie, FaBook } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import Footer from "../components/Footer";

const icons = [GrNotes, MdQuiz, FaPortrait, RiMovie2Fill, FaUserTie, FaBook];

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const loggedIn = !!username;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      Promise.all([getAllProjects(), getCompletedProjects(username)])
        .then(([allRes, completedRes]) => {
          const allProjects = allRes.data;
          const completedProjects = completedRes.data;
          const completedTitles = new Set(completedProjects);

          const projectsWithProgress = allProjects.map(proj => ({
            ...proj,
            progress: completedTitles.has(proj.projectTitle) ? 100 : 0,
          }));

          setProjects(projectsWithProgress);
        })
        .catch(err => console.error(err));
    } else {
      getAllProjects()
        .then(res => {
          const allProjects = res.data;
          const projectsWithoutProgress = allProjects.map(proj => ({
            ...proj,
            progress: null,
          }));
          setProjects(projectsWithoutProgress);
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mx-18 mt-10">
        {projects.map((proj, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={proj.id} onClick={() => handleClick(proj.id)} className="cursor-pointer">
              <ProjectCard
                title={proj.projectTitle}
                icon={Icon}
                iconBg="bg-indigo-400"
                progress={isLoggedIn ? proj.progress : null}
              />
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Project;
