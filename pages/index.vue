<template>
    <SkeletonHomepage v-if="isLoading" />

    <section v-else class="homepage">
        <div class="hero px-4 md:px-8 h-screen w-screen flex flex-col items-center justify-center gap-8 md:gap-12 lg:gap-16 bg-cover" :style="{ backgroundImage: `linear-gradient(to top,rgba(2,12,27,0.8),rgba(2,12,27,0.2)),url('https://image.tmdb.org/t/p/original${hero_img}')` }">
            <h1 class="text-6xl md:text-8xl text-white font-bold">{{ $t('hero_title') }}</h1>
            <h6 class="text-2xl text-white text-center">{{ $t('hero_subtitle') }}</h6>
            <div class="container mx-auto flex bg-white rounded-full overflow-hidden">
                <UInput size="xl" :placeholder="$t('hero_placeholder')" variant="none" v-model="searchInput" class="w-full pl-4 py-1 md:py-2 *:text-lg *:md:text-xl" @keydown.enter="vidStore.handleSearch(searchInput)" />
                <UButton size="xl" :label="$t('hero_search')" class="text-lg md:text-xl px-4 md:px-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-none" @click="vidStore.handleSearch(searchInput)" />
            </div>
        </div>
        <div class="trending px-4 mt-16 md:px-8">
            <div class="title mb-4 flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
                <h1 class="text-2xl md:text-4xl text-white font-bold">{{ $t('trending') }}</h1>
                <div class="flex flex-row gap-4">
                    <UTabs :items="typeItems" @change="switchTrendingType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-2 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
                    <UTabs :items="timeItems" @change="switchTrendingTime" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-4 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
                </div>
            </div>
            <SwiperCarousel type="movie-tv" :array="trending" />
        </div>
        <div class="popular px-4 md:px-8">
            <div class="title mb-4 flex items-center justify-between">
                <h1 class="text-2xl md:text-4xl text-white font-bold">{{ $t('popular') }}</h1>
                <UTabs :items="typeItems" @change="switchPopularType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-2 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
            </div>
            <SwiperCarousel type="movie-tv" :array="popular" />
        </div>
        <div class="top-rated px-4 md:px-8">
            <div class="title mb-4 flex items-center justify-between">
                <h1 class="text-2xl md:text-4xl text-white font-bold">{{ $t('rated') }}</h1>
                <UTabs :items="typeItems" @change="switchRatedType" :ui="{ list: { background: 'bg-white', height: 'h-12 md:h-14', rounded: 'rounded-full', marker: { background: 'bg-gradient-to-r from-orange-500 to-pink-500', rounded: 'rounded-full' }, tab: { padding: 'px-4 md:px-8', active: 'text-white', inactive: 'text-black', size: 'text-xs md:text-lg', height: 'h-10 md:h-12'}}}" />
            </div>
            <SwiperCarousel type="movie-tv" :array="rated" />
        </div>
    </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({ useScope: "global" });

const vidStore = useVidStore();
const { trendingType, trendingTime, popularType, ratedType, searchInput, typeItems, timeItems } = storeToRefs(vidStore);

// Skeleton loading time
const { isLoading } = useLoadingIndicator();

// declare search value
searchInput.value = '';

// get random hero backdrop image
const hero_img = ref<string>();

for (let i=0; i<10; i++) {
    const movie_id = Math.floor(Math.random() * 10000);
    const result = await vidStore.getRandomImage(movie_id);
    if (result) {
        hero_img.value = result;
        break;
    }
}

// u18n get typeitems, timeitems
watch(
    locale,
    () => {
        timeItems.value = [{ label: t('day') },{ label: t('week') }];
        typeItems.value = [{ label: t('movie') },{ label: t('show') }];
    },          
    { immediate: true}
)

// declare switch function in UTabs
const switchTrendingTime = async (index : number) => {
    const item : { label: string} = timeItems.value[index];
    if (item.label === timeItems.value[0].label) {
        trendingTime.value = 'day';
    } else {
        trendingTime.value = 'week';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, locale.value);
    trending.value = results;
}

const switchTrendingType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === typeItems.value[0].label) {
        trendingType.value = 'movie';
    } else {
        trendingType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, locale.value);
    trending.value = results;
}

const switchPopularType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === typeItems.value[0].label) {
        popularType.value = 'movie';
    } else {
        popularType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${popularType.value}/popular`, locale.value);
    popular.value = results;
}

const switchRatedType = async (index : number) => {
    const item : { label: string} = typeItems.value[index];
    if (item.label === typeItems.value[0].label) {
        ratedType.value = 'movie';
    } else {
        ratedType.value = 'tv';
    }
    const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${ratedType.value}/top_rated`, locale.value);
    rated.value = results;
}

// await callOnce(async () => {
//     const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, locale.value);
//     trending.value = results;
// })

// watch(
//     locale,
//     async () => {
//         const { data } = await useAsyncData('trending', () => vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, locale.value));
//         trending.value = data.value.results;
//     },
//     { immediate: true }
// )

const { data: trending } = await useAsyncData(
    'trending',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/trending/${trendingType.value}/${trendingTime.value}`, locale.value);
        return results;
    },
    { watch: [locale]}
);

const { data: popular } = await useAsyncData(
    'popular',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${popularType.value}/popular`, locale.value);
        return results;
    },
    { watch: [locale]}
);

const { data: rated } = await useAsyncData(
    'top rated',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${ratedType.value}/top_rated`, locale.value);
        return results;
    },
    { watch: [locale]}
);

</script>