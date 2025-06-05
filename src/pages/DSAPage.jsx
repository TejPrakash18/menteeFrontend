import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Progress from "../components/ProgressTracker";
import { getAllDSA } from "../services/dsaService";
import { Link } from "react-router-dom";

const DSAPage = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [progressState, setProgressState] = useState([]);

  // 1. Fetch questions & group them
  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getAllDSA();
        const grouped = questions.reduce((acc, question) => {
          const cat = question.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(question);
          return acc;
        }, {});

        const groupedArray = Object.entries(grouped).map(([name, questions]) => ({
          name,
          questions
        }));

        setGroupedData(groupedArray);
      } catch (error) {
        console.error("Error fetching DSA data:", error);
      }
    };

    fetchData();
  }, []);

  // 2. Once groupedData loaded, set or load progressState
  useEffect(() => {
    if (groupedData.length === 0) return;

    const savedProgress = localStorage.getItem("dsaProgress");

    if (savedProgress) {
      // Load progress from localStorage only if it matches current groupedData length
      try {
        const parsed = JSON.parse(savedProgress);
        if (parsed.length === groupedData.length) {
          setProgressState(parsed);
          return;
        }
      } catch {
        // ignore parsing errors, fallback to fresh init below
      }
    }

    // If no saved or mismatch, init progressState fresh
    const initialProgress = groupedData.map(cat => ({
      open: false,
      checked: Array(cat.questions.length).fill(false),
    }));

    setProgressState(initialProgress);
  }, [groupedData]);

  // 3. Save progressState to localStorage when it changes
  useEffect(() => {
    if (progressState.length > 0) {
      localStorage.setItem("dsaProgress", JSON.stringify(progressState));
    }
  }, [progressState]);

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

  if (groupedData.length === 0 || progressState.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#1c1c1e] text-white p-6 rounded-2xl mt-3 mx-20">
          <h1>Loading DSA Questions...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1c1c1e] text-white p-6 rounded-2xl mx-20 mt-5 ">
        <h1 className="text-xl font-bold mb-6 text-center">DSA Question Tracker</h1>
        <div className="space-y-4">
          {groupedData.map((category, catIndex) => {
            const completed = progressState[catIndex]?.checked?.filter(Boolean).length ?? 0;
            const total = category.questions.length;
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
                        <span>
                          <Link to={`/dsa/question/${question.id}`} className="text-blue-400 ">
                            {question.title}
                          </Link>
                        </span>
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
