import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Courses', to: '/courses' },
        // { name: 'Compiler', to: '/compiler' },
        { name: 'DSA', to: '/DSA' },
        { name: 'Project', to: '/project' },
    ];

    return (
        <nav className="bg-[#1D1C20] rounded-xl text-white p-4 flex items-center justify-between mx-10 ">
            <div className="text-xl font-bold flex items-center gap-2">
                <img src={logo} alt="Mentee Logo" className="w-8 h-8 rounded-full" />
                <span className="text-white text-1xl font-extrabold">Mentee</span>
            </div>

            <div className="flex space-x-6 items-center">
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <Link to={item.to} key={index}>
                            <div
                                className={`relative group inline-block font-semibold cursor-pointer ${
                                    isActive ? 'text-sky-400' : 'text-orange-400'
                                }`}
                            >
                <span className="relative z-10 transition duration-300 hover:text-sky-400" aria-hidden="true">
                  {item.name}
                </span>
                                <span className={`absolute left-0 -bottom-1 w-full h-1 ${
                                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                } transition-opacity duration-300`}>
                  <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
                    <path
                        d="M0 5 Q 5 0 10 5 T 20 5 T 30 5 T 40 5 T 50 5 T 60 5 T 70 5 T 80 5 T 90 5 T 100 5"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        fill="transparent"
                    />
                  </svg>
                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <Link to="/login">
                <button className="bg-orange-500 px-5 py-2 rounded-md text-white font-semibold text-sm">
                    LOGIN
                </button>
            </Link>
        </nav>
    );
};


export default Navbar;
