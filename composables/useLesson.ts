import { Ref } from 'vue';
import { LessonWithPath } from '@/types/course';

const useLesson = async (
  chapterSlug: string,
  lessonSlug: string
): Promise<Ref<LessonWithPath>> =>
  useFetchWithCache<LessonWithPath>(
    `/api/course/chapter/${chapterSlug}/lesson/${lessonSlug}`
  );

export default useLesson;
