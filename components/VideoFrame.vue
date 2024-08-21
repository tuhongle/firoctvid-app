<template>
    <UCard :ui="{ background: 'bg-transparent dark:bg-transparent', shadow: 'shadow-none', ring: 'ring-transparent dark:ring-transparent' }" class="group *:p-0 *:sm:p-0 hover:cursor-pointer" @click="isOpen = true">
        <div class="relative mb-4">
            <img :src="`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`" alt="video thumbnail" loading="lazy" class="aspect-video rounded-2xl object-cover m-auto opacity-55 group-hover:opacity-100 transition-all">
            <UIcon name="i-heroicons-play-circle" class="text-8xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 hover:text-pink-500 hover:cursor-pointer hover:scale-75 group-hover:opacity-100 group-hover:text-pink-500 group-hover:cursor-pointer group-hover:scale-75 transition-all" />
        </div>
        <div class="text-center text-white dark:text-black">
            <h3 class="text-2xl truncate">{{ item.name }}</h3>
        </div>
    </UCard>

    <UModal v-model="isOpen" :ui="{ background: 'bg-transparent' }">
      <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${item.key}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false);

defineProps<{
  item: Object,
}>()

</script>

<style scoped>

</style>