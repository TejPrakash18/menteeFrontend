import { useState } from "react";
import Navbar from "../components/Navbar";
import Progress from "../components/ProgressTracker";

const dsaData = [
    {
        name: "Basic",
        total : 40,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Arrays",
        total: 7,
        questions: [
            "Two Sum", "Group Anagrams", "Top K Frequent Elements",
            "Valid Sudoku", "Product of Array Except Self", "Encode and Decode Strings",
            "Longest Consecutive Sequence"
        ]
    },
    {
        name: "String",
        total: 7,
        questions: ["Valid Palindrome", "Two Sum II", "3Sum", "Container With Most Water", "Remove Duplicates"]
    },
    {
        name: "Sorting",
        total: 9,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Searching",
        total: 5,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "LinkedLists",
        total: 9,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Stack",
        total: 6,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Queue",
        total: 6,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Recurring",
        total: 5,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Tree",
        total: 5,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    },
    {
        name: "Graph",
        total: 5,
        questions: [
            "Maximum Subarray", "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum"
        ]
    }
    // Add more categories as needed
];

const DSAPage = () => {
    const [progressState, setProgressState] = useState(() => {
        return dsaData.map(category => ({
            open: false,
            checked: Array(category.total).fill(false)
        }));
    });

    const toggleOpen = (index) => {
        setProgressState(prev =>
            prev.map((c, i) => i === index ? { ...c, open: !c.open } : c)
        );
    };

    const toggleCheckbox = (catIndex, qIndex) => {
        setProgressState(prev =>
            prev.map((c, i) => {
                if (i !== catIndex) return c;
                const newChecked = [...c.checked];
                newChecked[qIndex] = !newChecked[qIndex];
                return { ...c, checked: newChecked };
            })
        );
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#1c1c1e] text-white p-6 rounded-2xl mt-3 mx-20">
                <h1 className="text-2xl font-bold mb-6">📘 DSA Question Tracker</h1>
                <div className="space-y-4">
                    {dsaData.map((category, catIndex) => {
                        const completed = progressState[catIndex].checked.filter(Boolean).length;
                        const total = category.total;
                        const progressPercent = (completed / total) * 100;

                        return (
                            <div key={catIndex} className="bg-gray-800 p-4 rounded-lg shadow-md">
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleOpen(catIndex)}
                                >
                                    <h2 className="text-lg font-semibold">{category.name}</h2>
                                    <span className="text-sm text-gray-400">({completed} / {total})</span>
                                </div>
                                <Progress value={progressPercent} className="h-2 my-2" />
                                {progressState[catIndex].open && (
                                    <ul className="pl-4 mt-2 space-y-1">
                                        {category.questions.map((question, qIndex) => (
                                            <li key={qIndex} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={progressState[catIndex].checked[qIndex]}
                                                    onChange={() => toggleCheckbox(catIndex, qIndex)}
                                                    className="accent-green-500"
                                                />
                                                <span>{question}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DSAPage;
