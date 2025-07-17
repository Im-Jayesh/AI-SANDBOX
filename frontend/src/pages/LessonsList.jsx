// src/LessonsList.jsx
import { Link } from 'react-router-dom';

export default function LessonsList() {
  const availableLessons = ['1', '2']; // Or derive from JSON

  return (
    <div className='pt-[100px] px-4 max-w-3xl mx-auto'>
      <h1>All Lessons</h1>
      <ul>
        {availableLessons.map(id => (
          <li key={id}>
            <Link to={`/lesson/${id}`}>Lesson {id}</Link>
          </li>
        ))}
        <li><Link to={"/cp_compiler/1"}>Problem 1 Find the closest to zero</Link></li>
      </ul>
    </div>
  );
}
