  import {
    FaLinkedinIn,
    FaInstagram,
    FaYoutube,
    FaTwitter,
  } from "react-icons/fa";

  const Footer = () => {
    return (
      <footer className="relative bg-[#0d0d0d] text-white py-14 px-6">
        {/* Background Blur Glow Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/10 to-purple-700/10 rounded-2xl blur-2xl opacity-60" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Grid */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-gray-700 pb-12">
            {/* Brand */}
            <div className="max-w-md space-y-5">
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Mentee<span className="text-orange-400">*</span>
              </h1>
              <p className="text-sm text-gray-400">
                Your one-stop platform for mastering DSA, interview prep, and real-world dev projects — free, forever.
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-orange-500 text-white p-3 rounded-full transition transform hover:-translate-y-1 duration-300"
                >
                  <FaLinkedinIn size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-pink-500 text-white p-3 rounded-full transition transform hover:-translate-y-1 duration-300"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-red-500 text-white p-3 rounded-full transition transform hover:-translate-y-1 duration-300"
                >
                  <FaYoutube size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-blue-500 text-white p-3 rounded-full transition transform hover:-translate-y-1 duration-300"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 text-sm w-full">
              <div>
                <h3 className="text-orange-400 font-semibold text-lg mb-3">Company</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-orange-400 font-semibold text-lg mb-3">Quick Access</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white transition">DSA Sheet</a></li>
                  <li><a href="#" className="hover:text-white transition">Blogs</a></li>
                  <li><a href="#" className="hover:text-white transition">CS Subjects</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-orange-400 font-semibold text-lg mb-3">DSA Sheets</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white transition">SDE Sheet</a></li>
                  <li><a href="#" className="hover:text-white transition">Core Sheet</a></li>
                  <li><a href="#" className="hover:text-white transition">Projects</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-orange-400 font-semibold text-lg mb-3">Playlists</h3>
                <ul className="text-gray-400 space-y-2">
                  <li><a href="#" className="hover:text-white transition">Array Series</a></li>
                  <li><a href="#" className="hover:text-white transition">Graph Series</a></li>
                  <li><a href="#" className="hover:text-white transition">DP Series</a></li>
                  <li><a href="#" className="hover:text-white transition">LinkedList Series</a></li>
                </ul>
              </div>
            </div>
          </div>

            {/* Bottom Text */}
            <div className="mt-10 text-center text-xs text-gray-500">
              © 2025 <span className="text-white font-semibold">Mentee</span>. All rights reserved.
            </div>
          



        </div>
      </footer>
    );
  };

  export default Footer;
