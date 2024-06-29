<template>
    <div class="hero px-4 md:px-8 h-screen w-screen flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 bg-[linear-gradient(to_top,rgba(0,0,0,0.8),rgba(0,0,0,0.2)),url('https://image.tmdb.org/t/p/original/dvBCdCohwWbsP5qAaglOXagDMtk.jpg')] bg-cover">
        <h1 class="text-6xl md:text-8xl text-white font-bold">Welcome.</h1>
        <h6 class="text-2xl text-white text-center">Millions of movies, TV shows and people to discover. Explore now.</h6>
        <div class="container mx-auto flex bg-white rounded-full overflow-hidden">
            <UInput size="xl" placeholder="Search for a movie or tv show..." variant="none" class="w-full pl-4 py-1 md:py-2 *:text-lg *:md:text-xl"/>
            <UButton size="xl" label="Search" class="text-lg md:text-xl px-4 md:px-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-none" />
        </div>
    </div>
    <div class="trending px-4 py-12 md:px-8">
        <div class="title mb-8 flex items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">Trending</h1>
            <UTabs :items="trendingItems" :ui="{ list: { background: 'bg-white', height: 'h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-8', active: 'text-white', inactive: 'text-black', size: 'text-lg', height: 'h-12'}}}" />
        </div>
        <SwiperCarousel />
    </div>
    <div class="popular px-4 py-12 md:px-8">
        <div class="title mb-8 flex items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">What's Popular</h1>
            <UTabs :items="popularItems" :ui="{ list: { background: 'bg-white', height: 'h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-8', active: 'text-white', inactive: 'text-black', size: 'text-lg', height: 'h-12'}}}" />
        </div>
        <SwiperCarousel />
    </div>
    <div class="top-rated px-4 py-12 md:px-8">
        <div class="title mb-8 flex items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">Top Rated</h1>
            <UTabs :items="ratedItems" :ui="{ list: { background: 'bg-white', height: 'h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-8', active: 'text-white', inactive: 'text-black', size: 'text-lg', height: 'h-12'}}}" />
        </div>
        <SwiperCarousel />
    </div>
</template>

<script setup lang="ts">
const trendingItems = ref([{ label: 'Day' },{ label: 'Week' }]);
const popularItems = ref([{ label: 'Movies' },{ label: 'TV Shows' }]);
const ratedItems = ref([{ label: 'Movies' },{ label: 'TV Shows' }]);


</script>