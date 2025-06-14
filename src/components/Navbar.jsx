import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import {toast} from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, username, logoutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const navItems = [
    { name: 'Compiler', to: '/compiler' },
    { name: 'DSA', to: '/DSA' },
    { name: 'Projects', to: '/projects' },
  ];
  const navigate = useNavigate();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#1D1C20] rounded-md text-white px-6 py-2 flex items-center justify-between mx-20 relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold flex items-center gap-2">
        <img src={logo} alt="Mentee Logo" className="w-10 h-10 rounded-full" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 text-xl font-bold tracking-wide">
          Mentee
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <Link to={item.to} key={index}>
              <div
                className={`relative group inline-block font-semibold cursor-pointer ${
                  isActive ? 'text-sky-400' : 'text-orange-400'
                }`}
              >
                <span
                  className="relative z-10 transition duration-300 hover:text-sky-400"
                  aria-hidden="true"
                >
                  {item.name}
                </span>
                <span
                  className={`absolute left-0 -bottom-1 w-full h-1 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`}
                >
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

      {/* Desktop Profile/Login/Logout */}
      <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>
        {isLoggedIn ? (
          <>
            <span className="text-orange-400 font-semibold select-none">
              <span className="capitalize">{username}</span>
            </span>

            {/* Profile Icon Button */}
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="p-1 rounded-full hover:bg-gray-700 transition"
              aria-label="User menu"
              title="User Profile"
            >
              <FaUserCircle size={30} className="text-orange-400" />
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div
                className="absolute right-0  mt-45 w-44 bg-gradient-to-br from-[#2A2B30] to-[#1D1C20] rounded-lg shadow-2xl
               ring-1 ring-[#2A2B30] ring-opacity-5
               transform origin-top-right scale-100 opacity-100
               transition ease-out duration-200 z-50"
              >
                {/* Small arrow */}
                <div
                  className="absolute top-0 right-4 w-3 h-3 bg-gradient-to-br from-gray-800 via-gray-900 to-black
                    rotate-45 -translate-y-1/2 border-l border-t border-gray-700"
                ></div>

                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsProfileOpen(false);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 hover:bg-sky-600 hover:text-white transition-colors rounded-t-lg font-semibold"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    toast.success("Logout Successfully");
                    navigate('/')
                    setIsProfileOpen(false);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-700 hover:text-red-100 transition-colors rounded-b-lg font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className="bg-orange-500 px-5 py-2 rounded-md text-white font-semibold text-sm"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger Icon */}
      <div className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-[#1D1C20]  text-white rounded shadow-xl transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-lg font-medium ${
                  location.pathname === item.to ? 'text-sky-400' : 'text-orange-400'
                } hover:text-sky-400`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <div className="flex flex-col items-center gap-2">
                <span className="text-orange-300 font-semibold"> {username}</span>
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="bg-orange-500 px-5 py-2 rounded-md text-white font-semibold text-sm"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    toast.success("Logout Successfully");
                    navigate('/')
                    setIsMenuOpen(false);
                  }}
                  className="text-red-400 font-semibold hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="bg-orange-500 px-5 py-2 rounded-md text-white font-semibold text-sm"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
