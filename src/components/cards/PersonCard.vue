<template>
    <div v-if="card.character" class="card bg-transparent">
        <div class="card-img overflow-hidden mb-4 d-flex align-items-center" style="border-radius: 50%; aspect-ratio: 1 /1;">
            <img 
            :src="card.profile_path ? 'https://image.tmdb.org/t/p/original'+card.profile_path : '/person.png'" 
            alt="profile picture" class="img-fluid object-fit-contain">
        </div>
        <div class="card-body text-center text-light">
            <h5 class="card-title text-nowrap fw-bold">{{ card.name }}</h5>
            <p class="card-text text-secondary">{{ card.character }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { personCardType } from '@/types/vidTypes'

defineProps<{
    card: personCardType,
}>();
</script>