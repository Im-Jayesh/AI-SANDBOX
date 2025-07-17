// src/components/RenderCourse.jsx
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CourseData from '../assets/JSONS/course.json';

const fetchLessons = () => {
  const raw = Array.isArray(CourseData) ? CourseData[0] : CourseData;
  return raw.lessons || {};
};

export default function RenderCourse() {
  const { lessonId } = useParams();
  const [lessons, setLessons] = useState({});
  const [pages, setPages] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lessonData = fetchLessons();
    setLessons(lessonData);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (lessons[lessonId]) {
        setPages(lessons[lessonId]);
        setPageIndex(0);
      } else {
        setPages(null);  // marker for invalid lesson
      }
    }
  }, [lessonId, lessons, loading]);

  if (loading) return <p>Loading course...</p>;

  if (pages === null) {
    // invalid lessonId — redirect or show 404
    return <Navigate to="/" replace />;
  }

  if (pages.length === 0) return <p>No content for Lesson {lessonId}</p>;

  const current = pages[pageIndex];

  return (
    <div className="pt-[100px] px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 fixed">Lesson {lessonId}</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-2">
          Page {current.page_no}: {current.heading}
        </h2>

        {current.content.map((item, idx) => {
          const isImage = item.startsWith('http');
          const isCode = item.startsWith('```');

          if (isCode) {
            const code = item.replace(/```/g, '').trim();
            return (
              <div key={idx}>
                <div className="bg-gray-700 text-gray-200 text-sm px-2 py-1 rounded-t w-fit">
                  Code
                </div>
                <pre className="bg-gray-100 p-4 rounded my-2 overflow-x-auto">
                  <code>{code}</code>
                </pre>
              </div>
            );
          }

          return isImage ? (
            <div key={idx} className="flex justify-center my-4">
              <img
                src={item}
                alt={`Illustration ${idx}`}
                className="max-h-[400px] object-contain rounded max-w-[90%] md:max-w-[70%]"
              />
            </div>
          ) : (
            <p key={idx} className="text-gray-800 my-2 leading-relaxed">
              {item}
            </p>
          );
        })}

        <div className="flex justify-between mt-6">
          <button
            onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => pageIndex < pages.length - 1 && setPageIndex(pageIndex + 1)}
            disabled={pageIndex === pages.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
