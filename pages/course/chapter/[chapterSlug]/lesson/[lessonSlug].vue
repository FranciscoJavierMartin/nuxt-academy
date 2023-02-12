<template>
  <div>
    <p class="mt-0 uppercase font-bold text-slate-400 mb-1">
      Lesson {{ chapter.number }} - {{ lesson.number }}
    </p>
    <h2 class="my-0">{{ lesson.title }}</h2>
    <div class="flex space-x-4 mt-2 mb-8">
      <NuxtLink
        v-if="lesson.sourceUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.sourceUrl"
      >
        Download Source Code
      </NuxtLink>
      <NuxtLink
        v-if="lesson.downloadUrl"
        class="font-normal text-md text-gray-500"
        :to="lesson.downloadUrl"
      >
        Download Video
      </NuxtLink>
    </div>
    <VideoPlayer v-if="lesson.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson.text }}</p>
    <LessonCompleteButton
      v-if="user"
      :model-value="!!isCompleted"
      @update:model-value="toggleComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Chapter } from '@/types/course';
import { RouteLocationNormalized } from 'vue-router';
import { useCourseProgress } from '~/stores/courseProgress';

const course = await useCourse();
const user = useSupabaseUser();
const route = useRoute();
const { chapterSlug, lessonSlug } = route.params;
const lesson = await useLesson(chapterSlug as string, lessonSlug as string);
const store = useCourseProgress();
const { initialize, toggleComplete } = store;

initialize();

definePageMeta({
  middleware: [
    async function (
      { params }: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) {
      const course = await useCourse();

      const chapter = course.value.chapters.find(
        (chapter) => chapter.slug === params.chapterSlug
      )!;

      if (!chapter) {
        throw abortNavigation(
          createError({
            statusCode: 404,
            message: 'Chapter not found',
          })
        );
      }

      const existsLesson: boolean = chapter.lessons.some(
        (lesson) => lesson.slug === params.lessonSlug
      );

      if (!existsLesson) {
        throw abortNavigation(
          createError({
            statusCode: 404,
            message: 'Lesson not found',
          })
        );
      }
    },
    'auth',
  ],
});

const isCompleted = computed(
  () =>
    (store.progress as any)?.[chapterSlug as string]?.[lessonSlug as string] ||
    0
);

const chapter = computed(() => {
  return course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )!;
});

if (!chapter.value) {
  throw createError({
    statusCode: 404,
    message: 'Chapter not found',
  });
}

if (!lesson.value) {
  throw createError({
    statusCode: 404,
    message: 'Lesson not found',
  });
}

const title = computed<string>(() => {
  return `${lesson.value.title} - ${course.value.title}`;
});

useHead({
  title,
});
</script>
