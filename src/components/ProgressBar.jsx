import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { fetchCompletedProjectsCount, fetchDSACompletedCountByDifficulty } from '../services/progressService';

const ProgressBar = () => {
    const [progress, setProgress] = useState({
        dsa: {
            total: 111,
            basic: 40,
            easy: 45,
            medium: 26,
            solvedBasic: 0,
            solvedEasy: 0,
            solvedMedium: 0,
        },
        projects: { total: 6, completed: 0 },
    });

    const username = localStorage.getItem("username");

    useEffect(() => {
        const loadProgressData = async () => {
            try {
                const [projectCount, dsaCount] = await Promise.all([
                    fetchCompletedProjectsCount(username),
                    fetchDSACompletedCountByDifficulty(username)
                ]);

                setProgress(prev => ({
                    ...prev,
                    dsa: {
                        ...prev.dsa,
                        solvedBasic: dsaCount.basic || 0,
                        solvedEasy: dsaCount.easy || 0,
                        solvedMedium: dsaCount.medium || 0,
                    },
                    projects: {
                        ...prev.projects,
                        completed: projectCount || 0,
                    }
                }));
            } catch (error) {
                console.error("Error loading progress data", error);
            }
        };

        if (username) {
            loadProgressData();
        }
    }, [username]);

    const calcPercentage = (completed, total) =>
        total > 0 ? ((completed / total) * 100).toFixed(0) : 0;

    const { basic, easy, medium, solvedBasic, solvedEasy, solvedMedium } = progress.dsa;
    const totalSolved = solvedBasic + solvedMedium + solvedEasy;

    return (
        <div className="bg-[#1D1C20] text-white lg:h-115 p-4 sm:p-6 md:p-10 font-sans mt-6 rounded-md w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DSA Progress */}
                <div className="bg-[#2A2B30] rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold mb-4 text-sky-400">DSA Progress</h2>
                    <div className="text-center text-2xl font-bold mb-2">
                        {totalSolved}/{basic + easy + medium}
                        <div className="text-sm font-medium text-green-400 flex items-center justify-center gap-1">
                            <FaCheckCircle className="text-green-400" /> Solved
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Basic */}
                        <div>
                            <div className="flex justify-between text-green-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Basic</span>
                                <span>{solvedBasic}/{basic}</span>
                            </div>
                            <div className="w-full h-2 bg-green-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-green-400 rounded-full"
                                    style={{ width: `${calcPercentage(solvedBasic, basic)}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Easy */}
                        <div>
                            <div className="flex justify-between text-yellow-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Easy</span>
                                <span>{solvedEasy}/{easy}</span>
                            </div>
                            <div className="w-full h-2 bg-yellow-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${calcPercentage(solvedEasy, easy)}%` }}
                                ></div>
                            </div>
                        </div>
                        {/* Medium */}
                        <div>
                            <div className="flex justify-between text-red-400 bg-[#1f1f1f] px-4 py-2 rounded-md">
                                <span>Medium</span>
                                <span>{solvedMedium}/{medium}</span>
                            </div>
                            <div className="w-full h-2 bg-red-900 rounded-full mt-1">
                                <div
                                    className="h-full bg-red-400 rounded-full"
                                    style={{ width: `${calcPercentage(solvedMedium, medium)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses and Projects */}
                <div className="bg-[#2A2B30] rounded-lg p-6 shadow">
                    <h2 className="text-lg font-semibold mb-2 text-sky-400">Overall Progress</h2>
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
                </div>
            </div>

            {/* Footer */}
            <div className="mt-10 text-sm text-gray-400 flex flex-col md:flex-row gap-3 justify-between items-center">
                <span>© 2025 Tej | Mentee - Smart LMS</span>
                <p>Report Bug: <a
                    href="mailto:tej22upa.dhyay@gmail.com"
                    className="text-orange-400 hover:underline"
                >
                     tej22upa.dhyay@gmail.com
                </a></p>
            </div>
        </div>
    );
};

export default ProgressBar;
