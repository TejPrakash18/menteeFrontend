import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(username, password);

            console.log("Login Success:", response.data);
            alert("Login successful!");

            navigate("/"); // Or navigate to /dashboard if you have
        } catch (error) {
            console.error("Login Failed:", error.response?.data || error.message);
            setError(error.response?.data || "Something went wrong.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black ">
            <div className="bg-[#1D1C20] p-10 rounded-lg shadow-lg w-full sm:w-96 space-y-8">
                <h2 className="text-3xl font-semibold text-center text-white">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-white">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-[#1D1C20]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-orange-400 text-white bg-[#1D1C20]"
                            required
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
