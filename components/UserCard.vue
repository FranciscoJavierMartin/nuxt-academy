<template>
  <div v-if="user" class="rounded p-3 flex items-center space-x-3 bg-white">
    <img
      class="rounded-full w-12 h-12 border-2 border-blue-400"
      :src="profile"
    />

    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm underline text-slate-500" @click="logout">
        Log out
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

const name = computed(() => user?.value.user_metadata.full_name);
const profile = computed(
  () =>
    user?.value.user_metadata.avatar_url ??
    'https://avatars.githubusercontent.com/u/23464945?v=4'
);

async function logout(): Promise<void> {
  const { error } = await auth.signOut();

  if (!error) {
    await navigateTo('/login');
  }
}
</script>
