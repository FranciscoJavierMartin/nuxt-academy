import { Lesson, LessonWithPath } from '@/types/course';

export default function useFirstLesson(): Lesson | LessonWithPath {
  const { chapters } = useCourse();
  return chapters[0].lessons[0];
}
