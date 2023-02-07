import {
  ChapterOutline,
  CourseOutline,
  LessonOutline,
} from '@/server/api/course/meta.get';

export type LessonOutlineWithPath = LessonOutline & {
  path: string;
};

export type ChapterOutlineWithPath = ChapterOutline & {
  lessons: LessonOutlineWithPath[];
};

export default async () => {
  const course = await useFetchWithCache<CourseOutline>('/api/course/meta');

  const chaptersOutline: ChapterOutline[] = course.value.chapters.map(
    (chapterOutline: ChapterOutline) => ({
      ...chapterOutline,
      lessons: chapterOutline.lessons.map((lesson: LessonOutline) => ({
        ...lesson,
        path: '',
      })),
    })
  );

  course.value.chapters = chaptersOutline;

  return course;
};
