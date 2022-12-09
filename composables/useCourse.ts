import courseData from '@/server/courseData';
import { Chapter, Course, Lesson, LessonWithPath } from '@/types/course';

export const useCourse = (): Course => {
  return {
    ...courseData,
    chapters: courseData.chapters.map<Chapter>((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map<LessonWithPath>((lesson: Lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    })),
  };
};
