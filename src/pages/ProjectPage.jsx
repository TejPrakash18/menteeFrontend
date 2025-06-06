import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects } from '../services/projectService';
import { GrNotes } from "react-icons/gr";
import { MdQuiz } from "react-icons/md";
import { FaPortrait,FaUserTie,FaBook   } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";




const icons = [GrNotes, MdQuiz,FaPortrait,RiMovie2Fill,FaUserTie ,FaBook  ];


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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mx-18 mt-10">
        {projects.map((proj, idx) => {
  const Icon = icons[idx % icons.length];  // cycle through icons

  return (
    <div key={idx} onClick={() => handleClick(proj.id)} className="cursor-pointer">
      <ProjectCard
        iconBg="bg-indigo-400"
        title={proj.projectTitle}
        icon={Icon}
      />
    </div>
  );
})}

      </div>
    </>
  );
};

export default Project;
