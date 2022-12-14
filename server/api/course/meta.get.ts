import { Chapter, Lesson } from '@/types/course';
import { CourseMeta, OutlineChapter, OutlineLesson } from '@/types/meta';
import courseData from '@/server/courseData';

export default defineEventHandler((event): CourseMeta => {
  const outlineChapters: OutlineChapter[] =
    courseData.chapters.map<OutlineChapter>((chapter: Chapter) => ({
      title: chapter.title,
      slug: chapter.slug,
      number: chapter.number,
      lessons: chapter.lessons.map<OutlineLesson>((lesson: Lesson) => ({
        title: lesson.title,
        slug: lesson.slug,
        number: lesson.number,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    }));

  return {
    title: courseData.title,
    chapters: outlineChapters,
  };
});
