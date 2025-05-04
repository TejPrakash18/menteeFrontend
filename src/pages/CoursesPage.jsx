import Navbar from "../components/Navbar";

import IconCard from "../components/TutorialCard";
import html from '../assets/html.svg'
import css from '../assets/css.svg'
import js from '../assets/javascript.svg'
import oops from '../assets/oops.svg'
import java from '../assets/java.svg'
import cpp from '../assets/cpp.svg'
import os from '../assets/os.svg'
import react from '../assets/react.svg'
import dbms from '../assets/data.svg'
import git from  '../assets/git.svg'
import spring from '../assets/spring.svg'
import sql from '../assets/sql.svg'



const CoursePage = () => {
    return (
        <>
            <Navbar/>
            <div className="ml-25 my-25 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9 ">
                <IconCard
                    icon={html}
                    title="HTML"
                    bgColor="bg-[#1D1C20]"
                    />
                <IconCard
                    icon={css}
                    title="CSS"
                    bgColor="bg-[#1D1C20]"
                    />
                <IconCard
                icon={js}
                title="Javascript"
                bgColor="bg-[#1D1C20]"
                />
                <IconCard
                    icon={cpp}
                    title="CPP"
                bgColor="bg-[#1D1C20]"/>

                <IconCard
                    icon={java}
                    title="Java"
                    bgColor="bg-[#1D1C20]"
                />
                <IconCard
                    icon={oops}
                    title="Oops"
                    bgColor="bg-[#1D1C20]"
                />
                <IconCard
                    icon={sql}
                    title="SQL"
                    bgColor="bg-[#1D1C20]"
                />
                <IconCard
                    icon={os}
                    title="OS" bgColor="bg-[#1D1C20]"/>

                <IconCard
                    icon={dbms}
                    title="DBMS"
                    bgColor="bg-[#1D1C20]"
                />
                <IconCard
                    icon={react}
                    title="React"
                    bgColor="bg-[#1D1C20]"
                />
                <IconCard icon={spring} title="Spring Boot" bgColor="bg-[#1D1C20]" />
                <IconCard
                    icon={git}
                    title="git & github"
                bgColor="bg-[#1D1C20]"/>
            </div>

        </>
    )
}

export default CoursePage;