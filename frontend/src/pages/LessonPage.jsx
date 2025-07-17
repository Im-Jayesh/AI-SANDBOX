// src/LessonPage.jsx
import { useParams } from 'react-router-dom';
import RenderCourse from './RenderCourse';

export default function LessonPage() {
  const { lessonId } = useParams();
  return <RenderCourse lessonId={lessonId} />;
}
