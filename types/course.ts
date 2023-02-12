import { Lesson as PrismaLesson } from '@prisma/client';

export type Lesson = PrismaLesson;

export type LessonWithPath = Lesson & {
  path: string;
};

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[] | LessonWithPath[];
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type Course = {
  title: string;
  chapters: Chapter[];
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
