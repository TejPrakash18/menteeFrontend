import { Link } from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900  px-4">
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full sm:w-96 space-y-8">
                <h2 className="text-3xl font-semibold text-center text-white">Register</h2>
                <form className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-white">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-white">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Login page */}
                <div className="text-center">
                    <p className="text-sm text-white">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-orange-400 font-semibold hover:text-orange-600 hover:underline transform hover:scale-105 transition duration-300 ease-in-out"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
