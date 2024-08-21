<template>
    <UCard :ui="{ background: 'bg-transparent dark:bg-transparent', shadow: 'shadow-none', ring: 'ring-transparent dark:ring-transparent' }">
        <img :src="item.profile_path ? `https://image.tmdb.org/t/p/original${item.profile_path}` : '/person.png'" alt="avatar casting" loading="lazy" class="rounded-full w-44 h-44 object-cover m-auto">
        <div class="text-center text-white dark:text-black mt-6">
            <h3 class="text-3xl font-medium mb-3">{{ item.name }}</h3>
            <h6 class="text-xl text-gray-300">{{ item.character }}</h6>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { person } from '@/types/vidType.ts'

defineProps<{
    item: person,
}>()
</script>

<style scoped>

</style>