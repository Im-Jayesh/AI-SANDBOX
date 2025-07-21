import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Quiz = () => {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const audioRight = useMemo(() => new Audio("/sounds/interface.mp3"), []);
  const audioWrong = useMemo(() => new Audio("/sounds/wronganswer.mp3"), []);
  const audioFinish = useMemo(() => new Audio("/sounds/completed.mp3"), []);

  const [queue, setQueue] = useState([]);
  const [pendingQueue, setPendingQueue] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/generate-quiz/${courseId}`);
        setQuiz(res.data);
        setQueue(res.data.questions.map((_, idx) => idx));
      } catch (err) {
        console.error("Error loading quiz:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [courseId]);

  useEffect(() => {
    if (finished) audioFinish.play();
  }, [finished, audioFinish]);

  if (loading) return <div className="text-center mt-10 text-white">Loading quiz...</div>;
  if (!quiz || !quiz.questions?.length)
    return <div className="text-center mt-10 text-white">No quiz available.</div>;

  const totalQuestions = quiz.questions.length;
  const currentQuestionIndex = queue[0];
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const answeredUnique = totalQuestions - queue.length;
  const questionNumber = answeredUnique + 1;
  const progressPercent = Math.round((answeredUnique / totalQuestions) * 100);

  const handleOptionClick = (optIdx) => {
    if (showFeedback || finished) return;
    setSelectedOption(optIdx);
    setAttempts((a) => a + 1);

    const restQueue = queue.slice(1);
    if (optIdx === currentQuestion.answer) {
      audioRight.play();
      setCorrectCount((c) => c + 1);
      setQueue(restQueue);
      if (restQueue.length === 0) setFinished(true);
      setShowFeedback(true);
    } else {
      audioWrong.play();
      setPendingQueue([...restQueue, currentQuestionIndex]);
      setShowFeedback(true);
    }
  };

  const handleContinue = () => {
    if (pendingQueue) {
      setQueue(pendingQueue);
      setPendingQueue(null);
      if (pendingQueue.length === 0) setFinished(true);
    }
    setSelectedOption(null);
    setShowFeedback(false);
  };

  if (finished) {
    const accuracy = attempts > 0 ? ((correctCount / attempts) * 100).toFixed(2) : "0.00";
    return (
      <div className="pt-12 mt-10 max-w-md mx-auto bg-[#2B1831] p-6 rounded-2xl shadow-md text-white space-y-4">
        <h2 className="text-2xl font-semibold text-purple-300 relative top-0 mb-2">
          Quiz Complete!
        </h2>
        <p>You answered <strong>{correctCount}</strong> out of <strong>{totalQuestions}</strong> correctly.</p>
        <p>Total attempts: <strong>{attempts}</strong></p>
        <p className="text-lg font-semibold">Accuracy: {accuracy}%</p>
      </div>
    );
  }

  return (
    <div className="pt-12 mt-10 max-w-md mx-auto bg-[#2B1831] p-6 rounded-2xl shadow-md text-white space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-purple-300 relative top-0 mb-2">
          {quiz.title}
        </h2>
        <p className="text-gray-300">{quiz.difficulty}</p>
      </div>

      <div className="w-full h-3 bg-gray-500 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progressPercent}%`,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #ffffff 0,
              #ffffff 8px,
              #b19cd9 8px,
              #b19cd9 16px
            )`
          }}
        />
      </div>
      <p className="text-sm text-gray-400">
        Question {questionNumber} of {totalQuestions}
      </p>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-purple-200">{currentQuestion.question}</h3>
        <ul className="space-y-2">
          {currentQuestion.options.map((opt, idx) => (
            <li key={idx}>
              <button
                onClick={() => handleOptionClick(idx)}
                disabled={showFeedback}
                className={`w-full text-left bg-white border px-4 py-2 rounded-md transition ${
                  showFeedback && idx === currentQuestion.answer
                    ? "bg-green-600"
                    : showFeedback && idx === selectedOption
                      ? "bg-red-700"
                      : "hover:bg-gray-600 bg-gray-700"
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {showFeedback && (
        <div className="mt-4 p-4 bg-[#3a2b42] rounded-md space-y-2">
          {selectedOption === currentQuestion.answer ? (
            <p className="text-sm text-green-400">Correct! 🎉</p>
          ) : (
            <>
              <p className="text-sm text-red-400">
                Wrong! Correct answer:{" "}
                <span className="font-semibold text-white">
                  {currentQuestion.options[currentQuestion.answer]}
                </span>.
              </p>
              {currentQuestion.explanation && (
                <p className="text-sm text-gray-300">{currentQuestion.explanation}</p>
              )}
            </>
          )}
          <button
            onClick={handleContinue}
            className="mt-2 px-5 py-2 bg-purple-400 text-black font-semibold rounded-md hover:scale-105 transition"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
