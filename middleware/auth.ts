import { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.params.chapterSlug === '1-chapter-1') {
      return;
    }
    return navigateTo('/login');
  }
);
