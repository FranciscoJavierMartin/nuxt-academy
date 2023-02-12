import { PrismaClient } from '@prisma/client';
import protectRoute from '~~/server/utils/protectRoute';
import { ChapterProgress, CourseProgress } from '~~/types/course';
import { ChapterOutline, LessonOutline } from '../course/meta.get';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  protectRoute(event);

  const {
    user: { email: userEmail },
  } = event.context;

  const userProgress = await prisma.lessonProgress.findMany({
    where: {
      userEmail,
      // We only want to get the progress for the first course right now
      Lesson: {
        Chapter: {
          Course: {
            id: 1,
          },
        },
      },
    },
    select: {
      completed: true,
      Lesson: {
        select: {
          slug: true,
          Chapter: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });

  const courseOutline = await $fetch('/api/course/meta');

  const progress = courseOutline.chapters.reduce(
    (courseProgress: CourseProgress, chapter: ChapterOutline) => {
      courseProgress[chapter.slug] = chapter.lessons.reduce(
        (chapterProgress: ChapterProgress, lesson: LessonOutline) => {
          chapterProgress[lesson.slug] =
            userProgress.find(
              (progress: any) =>
                progress.Lesson.slug === lesson.slug &&
                progress.Lesson.Chapter.slug === chapter.slug
            )?.completed || false;

          return chapterProgress;
        },
        {}
      );

      return courseProgress;
    },
    {}
  );

  return progress;
});
