import React from "react";
import courseData from "../assets/JSONS/course.json";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function LessonsList() {
  const lessons = courseData.lessons.map((lesson) => ({
    lesson_no: lesson.lesson_no,
    title: lesson.title,
    description: lesson.description,
    time: lesson.time,
    external_link: lesson.external_link
  }));

  return (
    <div
      className="min-h-screen bg-black text-white pb-24"
      style={{
        backgroundImage: 'radial-gradient(rgba(180,90,255,.07) 1.5px, transparent 1.5px), radial-gradient(rgba(128,148,255,.10) 1.5px, transparent 1.5px)',
        backgroundSize: '28px 28px',
        backgroundPosition: '0 0, 14px 14px'
      }}
    >
      <Nav />
      {/* Big Course Title */}
      <div className="pt-16 pb-2 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-100 leading-tight drop-shadow-lg">
          {courseData.title || "Course"}
        </h1>
        {courseData.description && (
          <p className="mt-2 text-purple-300 opacity-80 max-w-2xl mx-auto">
            {courseData.description}
          </p>
        )}
      </div>
      {/* "Course Lessons" Section Label */}
      <h2 className="text-2xl md:text-3xl font-bold text-center my-6 text-purple-300 drop-shadow relative top-0">
        Lessons
      </h2>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl space-y-8 px-2 md:px-0">
          {lessons.map(({ lesson_no, title, description, time }) => (
            <Link key={lesson_no} to={`/lesson/${lesson_no}`} className="block group">
              <div className="
                bg-gradient-to-br from-[#252341cc] to-[#16142bcc]
                backdrop-blur-xl border border-[#31215a88] rounded-2xl
                px-6 py-6 shadow-lg relative overflow-hidden
                group-hover:scale-[1.025] group-hover:shadow-2xl group-hover:border-purple-400
                transition-all duration-200
                ring-1 ring-purple-700/10
              ">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-purple-300 group-hover:text-white drop-shadow-sm">
                    Lesson {lesson_no}: {title}
                  </h3>
                  {time && (
                    <span className="text-xs md:text-sm text-purple-200 font-mono bg-purple-900/20 px-2 py-1 rounded shadow-inner">
                      {time}
                    </span>
                  )}
                </div>
                {description && (
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
