import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Progress from "../components/ProgressTracker";
import { getAllDSA, getCompletedQuestions } from "../services/dsaService";
import { Link } from "react-router-dom";

const DSAPage = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [progressState, setProgressState] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questions = await getAllDSA();

        const grouped = questions.reduce((acc, question) => {
          const category = question.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(question);
          return acc;
        }, {});

        const groupedArray = Object.entries(grouped).map(([name, questions]) => ({
          name,
          questions,
        }));

        setGroupedData(groupedArray);

        const defaultProgress = groupedArray.map(cat => ({
          open: false,
          checked: cat.questions.map(() => false),
        }));

        if (username) {
          const completedTitles = await getCompletedQuestions(username);
          const completedSet = new Set(completedTitles);

          const updatedProgress = groupedArray.map(cat => ({
            open: false,
            checked: cat.questions.map(q => completedSet.has(q.title)),
          }));

          setProgressState(updatedProgress);
        } else {
          setProgressState(defaultProgress);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading questions:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const toggleOpen = (index) => {
    setProgressState(prev =>
      prev.map((cat, i) => i === index ? { ...cat, open: !cat.open } : cat)
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#1c1c1e] text-white p-6 rounded-xl mt-3 mx-20">
          <h1>Loading DSA Questions...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#1c1c1e] text-white p-6 rounded mx-20 mt-5">
        <h1 className="text-xl font-bold mb-6 text-center">DSA Question Tracker</h1>

        <div className="space-y-4">
          {groupedData.map((category, catIndex) => {
            const checkedList = progressState[catIndex]?.checked || [];
            const completed = checkedList.filter(Boolean).length;
            const total = category.questions.length;
            const progressPercent = (completed / total) * 100;

            return (
              <div key={catIndex} className="bg-gray-800 p-4 rounded-md shadow-md">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOpen(catIndex)}
                >
                  <h2 className="text-lg font-semibold">{category.name}</h2>
                  <span className="text-sm text-gray-400">({completed} / {total})</span>
                </div>

                <Progress value={progressPercent} className="h-2 my-2" />

                {progressState[catIndex]?.open && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checkedList[qIndex] || false}
                          readOnly
                          className="accent-green-500"
                        />
                        <Link to={`/dsa/question/${question.id}`} className="text-blue-400">
                          {question.title}
                        </Link>
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
