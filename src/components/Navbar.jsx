import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex items-center justify-between ml-20 mr-20" >
      <div className="text-xl font-bold flex items-center gap-2">
        <img src={logo} alt="Mentee Logo" className="w-8 h-8" />
        <span className="text-white">mentee</span>
      </div>
      <div className="space-x-6">
        <a href="#" className="text-orange-400 font-semibold ">courses</a>
        <a href="#" className="text-orange-400 font-semibold ">compiler</a>
        <a href="#" className="text-orange-400 font-semibold ">DSA</a>
        <a href="#" className="text-orange-400 font-semibold ">project</a>
      </div>
      <button className="bg-orange-500 px-5 py-2 rounded-md text-white font-semibold text-sm">LOGIN</button>
    </nav>
  );
};

export default Navbar;