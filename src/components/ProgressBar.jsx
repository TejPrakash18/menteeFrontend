import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ProgressBar = () => {
    const [progress] = useState({
        dsa: {
            total: 110,
            easy: 50,
            medium: 40,
            hard: 20,
            solvedEasy: 30,
            solvedMedium: 10,
            solvedHard: 5,
        },
        courses: { total: 12, completed: 4 },
        projects: { total: 6, completed: 2 },
    });

    const calcPercentage = (completed, total) => ((completed / total) * 100).toFixed(0);

    const { easy, medium, hard, solvedEasy, solvedMedium, solvedHard } = progress.dsa;
    const totalSolved = solvedEasy + solvedMedium + solvedHard;

    return (
        <div className="bg-[#1D1C20] text-white p-4 sm:p-6 md:p-10 font-sans mt-6 rounded-2xl w-full">
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DSA Progress */}
                <div className="bg-[#2A2B30] rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold mb-4 text-sky-400">DSA Progress</h2>
                    <div className="text-center text-2xl font-bold mb-2">
                        {totalSolved}/{easy + medium + hard}
                        <div className="text-sm font-medium text-green-400 flex items-center justify-center gap-1">
                            <FaCheckCircle className="text-green-400" /> Solved
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Easy */}
                        <div>
                            <div className="flex justify-between text-green-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Easy</span>
                                <span>{solvedEasy}/{easy}</span>
                            </div>
                            <div className="w-full h-2 bg-green-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-green-400 rounded-full"
                                    style={{ width: `${(solvedEasy / easy) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Medium */}
                        <div>
                            <div className="flex justify-between text-yellow-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Medium</span>
                                <span>{solvedMedium}/{medium}</span>
                            </div>
                            <div className="w-full h-2 bg-yellow-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${(solvedMedium / medium) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Hard */}
                        <div>
                            <div className="flex justify-between text-red-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Hard</span>
                                <span>{solvedHard}/{hard}</span>
                            </div>
                            <div className="w-full h-2 bg-red-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-red-400 rounded-full"
                                    style={{ width: `${(solvedHard / hard) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses and Projects */}
                <div className="bg-[#2A2B30] rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold mb-2 text-sky-400">Overall Progress</h2>

                    {/* Courses */}
                    <h2 className="text-lg font-semibold mt-4 text-orange-400">Courses</h2>
                    <p>
                        Completed:{" "}
                        <span className="text-orange-400 font-semibold">
                            {progress.courses.completed}/{progress.courses.total}
                        </span>
                    </p>
                    <div className="w-full h-2 mt-4 bg-gray-700 rounded-full">
                        <div
                            className="h-full bg-orange-400 rounded-full"
                            style={{
                                width: `${calcPercentage(progress.courses.completed, progress.courses.total)}%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-sm mt-1 text-right">
                        {calcPercentage(progress.courses.completed, progress.courses.total)}% completed
                    </p>

                    {/* Projects */}
                    <h2 className="text-lg font-semibold mt-6 text-green-400">Projects</h2>
                    <p>
                        Completed:{" "}
                        <span className="text-green-400 font-semibold">
                            {progress.projects.completed}/{progress.projects.total}
                        </span>
                    </p>
                    <div className="w-full h-2 mt-4 bg-gray-700 rounded-full">
                        <div
                            className="h-full bg-green-400 rounded-full"
                            style={{
                                width: `${calcPercentage(progress.projects.completed, progress.projects.total)}%`,
                            }}
                        ></div>
                    </div>
                    <p className="text-sm mt-1 text-right">
                        {calcPercentage(progress.projects.completed, progress.projects.total)}% completed
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-sm text-gray-400 flex flex-col md:flex-row gap-3 justify-between items-center">
                <span>© 2025 Tej | Mentee - Smart LMS</span>
                <a
                    href="mailto:tej22upa.dhyay@gmail.com"
                    className="text-orange-400 hover:underline"
                >
                    tej22upa.dhyay@gmail.com
                </a>
            </div>
        </div>
    );
};

export default ProgressBar;
