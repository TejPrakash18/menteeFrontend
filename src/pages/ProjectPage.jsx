import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import todo from '../assets/todo.svg'
import portfolio from '../assets/portfolio.svg'
import movie from '../assets/movie.svg'
import quiz from '../assets/quiz.svg'
import employee from '../assets/employees.svg'
import job from '../assets/jobPortal.svg'
import DashboardPage from "./UserDashboard";


const Project = () => {
    const projects = [
        {
            icon: todo,
            title: "Todo App",
            description: "Personal portfolio built using React and Tailwind",
            iconBg: "bg-orange-400",
        },
        {
            icon: portfolio,
            title: "Portfolio",
            description: "Learning Management System using Node.js and React",
            iconBg: "bg-blue-500",
        },
        {
            icon: movie,
            title: "Movie App",
            description: "Real-time compiler built with Spring Boot backend",
            iconBg: "bg-teal-500",
        },
        {
            icon: quiz,
            title: "Quiz App",
            description: "RESTful API with JWT and PostgreSQL",
            iconBg: "bg-red-400",
        },
        {
            icon: employee,
            title: "Employee Management System",
            description: "RESTful API with JWT and PostgreSQL",
            iconBg: "bg-green-400",
        },
        {
            icon: job,
            title: "Job Portal Management System",
            description: "RESTful API with JWT and PostgreSQL",
            iconBg: "bg-yellow-400",
        },

    ];

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mx-18">
                {projects.map((proj, idx) => (
                    <ProjectCard key={idx} {...proj} />
                ))}
            </div>
            <DashboardPage/>
        </>
    );
};

export default Project;
