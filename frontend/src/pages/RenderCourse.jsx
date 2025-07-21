import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseData from '../assets/JSONS/course.json';
import Quiz from '../components/Quiz';
import CpCompiler from '../pages/CP_Compiler';
import Nav from '../components/Nav';

function LessonProgressBar({ current, total }) {
  const percent = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div className="mb-2">
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percent}%`,
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #ffffff,
              #ffffff 8px,
              #8163B6 8px,
              #8163B6 16px
            )`
          }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Page {current} of {total}
      </p>
    </div>
  );
}


export default function RenderCourse() {
  const { lessonId } = useParams();
  const navigate = useNavigate();

  const lessons = CourseData.lessons || [];
  const numericLessonId = Number(lessonId);
  const nextLessonId = numericLessonId + 1;

  const [lesson, setLesson] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showCompleteCard, setShowCompleteCard] = useState(false);
  const [audio] = useState(() => new Audio('/sounds/completed.mp3'));

  // load lesson
  useEffect(() => {
    const found = lessons.find(l => Number(l.lesson_no) === numericLessonId);
    setLesson(found || null);
    setCurrentPageIndex(0);
    setShowCompleteCard(false);
  }, [lessons, numericLessonId]);

  const pages = lesson?.external_link
    ? [{
        page_no: 1,
        heading: lesson.title,
        external: lesson.external_link,
        quiz: lesson.quiz,
        compiler: lesson.compiler,
      }]
    : lesson?.pages || [];

  const totalPages = pages.length;
  const isLastPage = currentPageIndex === totalPages - 1;
  const isLastLesson = numericLessonId >= lessons.length;

  // handlers
  const handlePrev = useCallback(() => {
    if (currentPageIndex > 0) setCurrentPageIndex(i => i - 1);
  }, [currentPageIndex]);

  const handleNext = useCallback(() => {
    if (!isLastPage) {
      setCurrentPageIndex(i => i + 1);
    } else if (!isLastLesson) {
      setShowCompleteCard(true);
      audio.play();
    }
  }, [isLastPage, isLastLesson, audio]);

  const handleContinue = useCallback(() => {
    setShowCompleteCard(false);
    navigate(`/lesson/${nextLessonId}`);
  }, [navigate, nextLessonId]);

  // global arrow keys
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === 'ArrowRight') {
        showCompleteCard ? handleContinue() : handleNext();
      }
      if (e.key === 'ArrowLeft' && !showCompleteCard) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showCompleteCard, handleNext, handlePrev, handleContinue]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{
        backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}>
        <p className="text-red-500 text-lg">Lesson not found.</p>
      </div>
    );
  }

  const currentPage = pages[currentPageIndex];

  return (
    <div
      className="min-h-screen text-gray-900 dark:text-gray-100"
      style={{
        backgroundImage: 'radial-gradient(#ddd 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      <Nav />

      <main className="pt-20 pb-10">
        {/* content container */}
        <div className="max-w-3xl mx-auto px-4">
          {/* progress */}
          <LessonProgressBar current={currentPageIndex + 1} total={totalPages} />

          {/* lesson header */}
          <h1 className="text-4xl text-neutral-800 font-bold relative top-0 mb-2">
            Lesson {lesson.lesson_no}: {lesson.title}
          </h1>
          {lesson.description && (
            <p className="prose prose-lg mb-4">{lesson.description}</p>
          )}
          {lesson.time && (
            <span className="text-sm text-gray-500 block mb-6">
              {lesson.time}
            </span>
          )}

          {/* page heading */}
          <h2 className="text-2xl  font-semibold relative top-0 mb-4">
            Page {currentPage.page_no}: {currentPage.heading}
          </h2>

          {/* content / quiz / compiler */}
          {[].concat(
            // iframe first, full-width
            currentPage.external && !currentPage.quiz && !currentPage.compiler
              ? (
                <iframe
                  key="iframe"
                  src={currentPage.external.startsWith('/quiz') ? currentPage.external + '/' + lessonId : currentPage.external}
                  title={`External ${lesson.title}`}
                  className="
                    w-screen relative left-1/2 -ml-[50vw] h-screen mb-8
                  "
                />
              ) : [],
            // quiz or compiler
            currentPage.quiz ? <Quiz key="quiz" quiz={currentPage.quiz} /> : [],
            currentPage.compiler ? <CpCompiler key="compiler" /> : [],
            // inline content
            !currentPage.external
              ? currentPage.content.map((c, i) => {
                  if (c.startsWith('```')) {
                    const code = c.replace(/```/g, '').trim();
                    return (
                      <pre
                        key={i}
                        className="bg-gray-800 text-green-300 p-4 rounded-md overflow-x-auto mb-4"
                      >
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  if (c.startsWith('http')) {
                    return (
                      <img
                        key={i}
                        src={c}
                        className="mx-auto rounded-md shadow mb-4"
                      />
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="prose prose-lg mb-4"
                    >
                      {c}
                    </p>
                  );
                })
              : []
          )}

          {/* nav buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPageIndex === 0}
              className={`px-6 py-3 font-semibold rounded-lg transition ${
                currentPageIndex === 0
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow hover:shadow-lg'
              }`}
            >
              Back
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-neonPurple to-blue-400 text-white shadow hover:scale-105 transition"
            >
              {isLastPage
                ? isLastLesson
                  ? 'Finish'
                  : 'Next Lesson'
                : 'Next'}
            </button>
          </div>
        </div>
      </main>

      {/* completion overlay */}
      {showCompleteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center space-y-4 animate-scaleFadeIn">
            <p className="text-4xl">🎉</p>
            <h3 className="text-2xl font-bold">Lesson Complete!</h3>
            <button
              onClick={handleContinue}
              className="px-4 pr-6 bg-green-500 text-white rounded-full font-semibold hover:scale-105 transition"
            >
              Continue   
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
