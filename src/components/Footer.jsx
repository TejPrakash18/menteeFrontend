import { FaLinkedin, FaTimesCircle, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
      <footer className="bg-[#111111] text-white p-10 border-t-4 border-orange-400">
        <div className="flex flex-wrap justify-around gap-8">
          {/* Logo + Text + Social Icons */}
          <div className="max-w-sm">
            <h1 className="text-4xl font-extrabold text-white mb-2">Mentee<span className="text-orange-400">{'*'}</span></h1>
            <p className="text-sm text-gray-400 mb-5">
              The best place to learn data Structures, algorithms, most asked coding interview questions, real projects experiences free of cost.
            </p>
            <div className="flex gap-4 text-xl">
              <FaLinkedin className="hover:text-orange-400 cursor-pointer" />
              <FaTimesCircle className="hover:text-orange-400 cursor-pointer" />
              <FaInstagram className="hover:text-orange-400 cursor-pointer" />
              <FaYoutube className="hover:text-orange-400 cursor-pointer" />
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg">Company</h3>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>

          {/* Quick Access Links */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg">Quick Access</h3>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li><a href="#">DSA Sheet</a></li>
              <li><a href="#">Technical Blogs</a></li>
              <li><a href="#">CS Subjects</a></li>
            </ul>
          </div>

          {/* DSA Sheets Links */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg">DSA Sheets</h3>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li><a href="#">SDE Sheet</a></li>
              <li><a href="#">SDE Core Sheet</a></li>
              <li><a href="#">Project's Sheet</a></li>
            </ul>
          </div>

          {/* DSA Playlist Links */}
          <div>
            <h3 className="text-orange-400 font-bold text-lg">DSA Playlist</h3>
            <ul className="text-sm text-gray-300 space-y-1 mt-2">
              <li><a href="#">Array Series</a></li>
              <li><a href="#">Graph Series</a></li>
              <li><a href="#">DP Series</a></li>
              <li><a href="#">LinkedList Series</a></li>
            </ul>
          </div>
        </div>

        <hr className="mt-10 border-gray-600" />
        <p className="text-center text-sm text-gray-500 mt-5">© 2025 MENTEE. All rights reserved.</p>
      </footer>
  );
};

export default Footer;
