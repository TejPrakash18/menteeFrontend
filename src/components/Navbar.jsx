import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between ml-20 mr-20">
      <div className="text-xl font-bold flex items-center gap-2">
        <img src={logo} alt="Mentee Logo" className="w-8 h-8 rounded-full" />
        <span className="text-white text-3xl font-extrabold">mentee</span>
      </div>
      <div className="space-x-6">
        <a href="#" className="text-orange-400 font-semibold">courses</a>
          <Link to="/compiler">
              <a href="#" className="text-orange-400 font-semibold">compiler</a>
          </Link>
        <a href="#" className="text-orange-400 font-semibold">DSA</a>
        <a href="#" className="text-orange-400 font-semibold">project</a>
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

