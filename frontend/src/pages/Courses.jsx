import { Link } from "react-router-dom";
import CourseCards from "../assets/JSONS/course_card.json";

const Courses = () => (
  <div className="min-h-screen bg-gray-100 pt-20 px-4">
    <h1 className="text-4xl font-bold text-gray-900 mb-10">Available Courses</h1>
    <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
      {CourseCards.map((c) => (
        <article
          key={c.courseId}
          className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow transition group"
        >
          <Link
            to={`/lessons/${c.courseId}`}
            className="block focus:outline-none focus:ring-2 focus:ring-black"
            aria-label={`View course: ${c.courseName}`}
          >
            <h2 className="text-2xl font-semibold relative top-0 text-gray-900 mb-2 group-hover:text-black transition">
              {c.courseName}
            </h2>
            <p className="text-gray-600 mb-4">{c.description}</p>
            {c.instructor && (
              <div className="text-gray-800 mb-2">
                <span className="font-medium">Instructor:</span>{" "}
                {c.instructor.name}
              </div>
            )}
          </Link>
          <div className="flex flex-wrap gap-3 mt-2">
            {c.instructor?.links?.map((link) => (
              <a
                key={link.type + link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 underline underline-offset-2 text-sm transition"
                aria-label={`Instructor ${link.type}`}
              >
                {link.type}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default Courses;
