<template>
    <section class="container mx-auto mt-44">
        <div class="flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
            <h1 class="text-4xl font-bold text-white dark:text-black">Explorer {{ (genre === 'movie') ? 'Movies' : 'TV Shows' }}</h1>
            <div class="flex gap-4">
                <USelectMenu multiple searchable searchable-placeholder="type genre..." size="xl" v-model="selectedGenre" :options="genres" placeholder="Select Genres" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-56', rounded: 'rounded-full'}" />
                <USelectMenu size="xl" v-model="sortBy" :options="sortList" placeholder="Sort By" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-56', rounded: 'rounded-full'}" />
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-8">
            <SwiperCarousel type="movie-tv" :array="[]" />
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute();
const genre = route.params.genre;

const genres = ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer'];
const sortList = ['Popularity Ascending', 'Popularity Descending', 'Rating Ascending', 'Rating Descending', 'Release Date Ascending', 'Release Date Descending', 'Title (A-Z)', 'Title (Z-A)'];

const selectedGenre = ref<string[]>([]);
const sortBy = ref<string>();

</script>

<style scoped>

</style>