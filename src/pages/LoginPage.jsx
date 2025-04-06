import { Link } from "react-router-dom";

const LoginPage = () => {

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 pt-10 px-4">
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full sm:w-96 space-y-8">
          <h2 className="text-3xl font-semibold text-center text-white">Login</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white">Password</label>
              <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
              />
            </div>
            <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <Link
                  to="/register"
                  className="text-orange-400 font-semibold hover:text-orange-600 hover:underline transform hover:scale-105 transition duration-300 ease-in-out"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
