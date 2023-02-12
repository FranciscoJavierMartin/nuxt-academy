import { defineStore } from 'pinia';

export const useCourseProgress = defineStore('courseProgress', () => {
  const progress = ref<any>({});
  const initialized = ref<boolean>(false);

  async function initialize() {
    if (!initialized.value) {
      initialized.value = true;
    }
  }

  const toggleComplete = async (chapter: string, lesson: string) => {
    const user = useSupabaseUser();
    if (user.value) {
      if (!chapter || !lesson) {
        const {
          params: { chapterSlug, lessonSlug },
        } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      const currentProgress = (progress.value as any)[chapter]?.[lesson];

      (progress.value as any)[chapter] = {
        ...(progress.value as any)[chapter],
        [lesson]: !currentProgress,
      };

      try {
        await $fetch(
          `/api/course/chapter/${chapter}/lesson/${lesson}/progress`,
          {
            method: 'POST',
            body: {
              completed: !currentProgress,
            },
          }
        );
      } catch (error) {
        console.log(error);
        (progress.value as any)[chapter] = {
          ...(progress.value as any)[chapter],
          [lesson]: currentProgress,
        };
      }
    }
  };

  return {
    initialize,
    progress,
    toggleComplete,
  };
});
