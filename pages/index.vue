<template>
    <div class="hero px-4 md:px-8 h-screen w-screen flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 bg-cover" :style="{ backgroundImage: `linear-gradient(to top,rgba(2,12,27,0.8),rgba(2,12,27,0.2)),url('https://image.tmdb.org/t/p/original${hero_img}')` }">
        <h1 class="text-6xl md:text-8xl text-white font-bold">Welcome.</h1>
        <h6 class="text-2xl text-white text-center">Millions of movies, TV shows and people to discover. Explore now.</h6>
        <div class="container mx-auto flex bg-white rounded-full overflow-hidden">
            <UInput size="xl" placeholder="Search for a movie or tv show..." variant="none" class="w-full pl-4 py-1 md:py-2 *:text-lg *:md:text-xl"/>
            <UButton size="xl" label="Search" class="text-lg md:text-xl px-4 md:px-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-none" />
        </div>
    </div>
    <div class="trending px-4 mt-16 md:px-8">
        <div class="title mb-4 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">Trending</h1>
            <div class="flex flex-row gap-4">
                <UTabs :items="typeItems" @change="switchTrendingType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-2 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
                <UTabs :items="timeItems" @change="switchTrendingTime" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-4 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
            </div>
        </div>
        <SwiperCarousel type="movie-tv" :array="trending" />
    </div>
    <div class="popular px-4 md:px-8">
        <div class="title mb-4 flex items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">What's Popular</h1>
            <UTabs :items="typeItems" @change="switchPopularType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-2 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
        </div>
        <SwiperCarousel type="movie-tv" :array="popular" />
    </div>
    <div class="top-rated px-4 md:px-8">
        <div class="title mb-4 flex items-center justify-between">
            <h1 class="text-2xl md:text-4xl text-white font-bold">Top Rated</h1>
            <UTabs :items="typeItems" @change="switchRatedType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-4 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
        </div>
        <SwiperCarousel type="movie-tv" :array="rated" />
    </div>
</template>

<script setup lang="ts">
const timeItems = ref([{ label: 'Day' },{ label: 'Week' }]);
const typeItems = ref([{ label: 'Movies' },{ label: 'TV Shows' }]);

const vidStore = useVidStore();
const { trendingType, trendingTime, popularType, ratedType, trending, popular, rated } = storeToRefs(vidStore);

// get random hero backdrop image
const hero_img = ref<string>();

for (let i=0; i<10; i++) {
    const movie_id = useState('id', () => Math.floor(Math.random() * 10000));
    const result = await vidStore.getRandomImage(movie_id.value);
    if (result) {
        hero_img.value = result;
        break;
    }
}

// declare switch function in UTabs
const switchTrendingTime = async (index : number) => {
    const item : { label: string} = timeItems.value[index];
    if (item.label === 'Day') {
        trendingTime.value = 'day';
    } else {
        trendingTime.value = 'week';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, 'en');
    trending.value = results;
}

const switchTrendingType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === 'Movies') {
        trendingType.value = 'movie';
    } else {
        trendingType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, 'en');
    trending.value = results;
}

const switchPopularType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === 'Movies') {
        popularType.value = 'movie';
    } else {
        popularType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${popularType.value}/popular`, 'en');
    popular.value = results;
}

const switchRatedType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === 'Movies') {
        ratedType.value = 'movie';
    } else {
        ratedType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${ratedType.value}/top_rated`, 'en');
    rated.value = results;
}

await callOnce(async () => {
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, 'en');
    trending.value = results;
})

await callOnce(async () => {
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${popularType.value}/popular`, 'en');
    popular.value = results;
})

await callOnce(async () => {
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${ratedType.value}/top_rated`, 'en');
    rated.value = results;
})

</script>