import { LessonWithPath } from '@/types/course';
import { Ref } from 'vue';

const useLesson = async (
  chapterSlug: string,
  lessonSlug: string
): Promise<Ref<LessonWithPath>> => {
  const { data, error } = await useFetch(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not fetch lesson ${lessonSlug} in chapter ${chapterSlug}`,
    });
  }

  return data as Ref<LessonWithPath>;
};

export default useLesson;
