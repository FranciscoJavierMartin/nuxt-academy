import { Chapter } from '@/types/course';
import course from '@/server/courseData';

export default defineEventHandler((event) => {
  const { chapterSlug, lessonSlug } = event.context.params;

  const chapter: Chapter = course.chapters.find(
    (chapter) => chapter.slug === chapterSlug
  )!;

  if (!chapter) {
    createError({
      statusCode: 404,
      message: 'Chapter not found',
    });
  }

  const lesson = chapter.lessons.find((lesson) => lesson.slug === lessonSlug)!;

  if (!lesson) {
    createError({
      statusCode: 404,
      message: 'Lesson not found',
    });
  }

  return lesson;
});
