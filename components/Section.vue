<template>
  <div class="section bg-white p-24 flex flex-col items-center">
    <div class="w-full max-w-4xl">
      <h2 v-if="title" class="text-4xl font-bold pb-8 text-center">
        {{ title }}
      </h2>
      <div v-bind="$attrs">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title?: string }>();
</script>

<style>
.section:nth-of-type(even) {
  @apply bg-blue-500 text-white;
}
</style>
