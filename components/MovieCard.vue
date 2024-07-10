<template>
    <UCard class="group bg-transparent rounded-2xl shadow-none border-none ring-0 hover:ring-pink-500 hover:shadow-2xl hover:shadow-pink-500 hover:scale-105 hover:cursor-pointer transition-all" :ui="{body: {padding: 'px-2 pb-4 sm:px-0 pb-4'}}">
        <div class="flex flex-col gap-10">
            <div class="relative group-hover:scale-95">
                <img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" alt="card thumbnail" loading="lazy" class="aspect-[2/3] rounded-2xl bg-cover group-hover:border group-hover:border-orange-500 transition-all">
                <ul class="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 flex flex-wrap justify-end gap-2 w-3/4">
                    <li class="bg-pink-500 text-xs px-2 py-1 text-white rounded-md" v-for="genre in genresList" :key="genre">{{ genre }}</li>
                </ul>
                <div class="absolute bottom-0 left-0 translate-x-4 translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    <span class="text-black text-md font-bold absolute m-auto">{{ item.vote_average.toFixed(1) }}</span>
                    <ve-progress :progress="item.vote_average.toFixed(2) * 10" :color :size="50" :thickness="7" font-color="transparent" />
                </div>
            </div>
            <div class="flex flex-col gap-3 px-2">
                <h1 class="text-white text-3xl md:text-2xl">
                    <span v-if="item.title">{{ item.title }}</span>
                    <span v-else>{{ item.name }}</span>
                </h1>
                <h6 class="text-gray-500 text-lg">
                    <span v-if="item.release_date">{{ item.release_date }}</span>
                    <span v-else>{{ item.first_air_date }}</span>
                </h6>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

type MovieTv = {
    title: string,
    name: string,
    release_date: string,
    first_air_date: string,
    vote_average: number,
    poster_path: string
}

const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

const props = defineProps<{
    item: MovieTv,
}>();

const color = ref<string>();

switch (true) {
    case (props.item.vote_average > 7):
        color.value = 'green';
        break;
    case (props.item.vote_average <= 5):
        color.value = 'red';
        break;
    case (props.item.vote_average <= 7 && props.item.vote_average > 5):
        color.value = 'orange';
        break;
}

const genresArray = ref((props.item.title) ? genreMovies.value : genreTV.value);

const genresList = genresArray.value.filter(el => props.item.genre_ids.includes(el.id)).map(el => el.name);
</script>
