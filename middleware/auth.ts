import { RouteLocationNormalized } from 'vue-router';

export default defineNuxtRouteMiddleware(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log('1');
    if (to.params.chapterSlug === '1-chapter-1') {
      return;
    }
    return navigateTo('/login');
  }
);
