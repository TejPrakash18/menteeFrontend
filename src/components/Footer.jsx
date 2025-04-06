const Footer = () => {
    return (
        
      <footer className="bg-gray-900 text-white p-10 border-t-6 border-orange-400">
        <div className="flex justify-around flex-wrap">
          <div>
            <h3 className="text-orange-400 font-extrabold text-3xl ">mentee</h3>
            <p className="text-gray-200 text-sm mt-3 max-w-sm">
              The best place to learn data structures and algorithms, as well as development skills, interview questions. You can also get real interview experiences free of cost.
            </p>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold text-lg">Company</h3>
            <ul className="text-gray-300 text-sm mt-2 space-y-1">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-400 font-bold text-lg">DSA Series</h3>
            <ul className="text-gray-300 text-sm mt-2 space-y-1">
              <li><a href="#">Array String</a></li>
              <li><a href="#">Linked List</a></li>
              <li><a href="#">DP</a></li>
              <li><a href="#">Graph</a></li>
            </ul>
          </div>
        </div>
      </footer>
    
    );
  };

  export default Footer;