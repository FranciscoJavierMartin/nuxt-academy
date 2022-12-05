import courseData from '@/courseData';

type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string;
};

type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

type Course = {
  title: string;
  chapters: Chapter[];
};

export const useCourse = (): Course => {
  return {
    ...courseData,
    chapters: courseData.chapters.map<Chapter>((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map<Lesson>((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`,
      })),
    })),
  };
};
