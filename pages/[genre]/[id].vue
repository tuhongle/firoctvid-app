<template>
    <SkeletonDetail v-if="isLoading" />
    
    <section v-else class="container text-white dark:text-black mx-4 md:mx-auto">
        <div class="hero grid grid-cols-12 gap-0 lg:gap-12 pt-40 pb-24 px-4 md:px-8 lg:px-12 xl:px-16 mb-12 bg-cover" :style="{ backgroundImage: `linear-gradient(to top,rgba(2,12,27,0.85),rgba(2,12,27,0.75)),url('https://image.tmdb.org/t/p/original${detail.backdrop_path}')`}">
            <div class="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
                <ULink :to="detail.homepage" target="_blank">
                    <img :src="`https://image.tmdb.org/t/p/original${detail.poster_path}`" alt="thumbnail image" class="aspect-[2/3] rounded-3xl">
                </ULink>
            </div>
            <div class="col-span-12 lg:col-span-7">
                <h1 class="font-bold text-6xl xl:text-7xl mb-6">
                    <span v-if="detail.title">{{ detail.title }}</span>
                    <span v-if="detail.name">{{ detail.name }}</span>
                </h1>
                <h3 class="italic font-semibold text-4xl text-gray-400 mb-8">{{ detail.tagline }}</h3>
                <ul class="flex gap-4 mb-12">
                    <li class="px-3 py-2 bg-pink-500 rounded-lg font-medium" v-for="genre in detail.genres" :key="genre.id">{{ genre.name }}</li>
                </ul>
                <div class="flex flex-col lg:flex-row items-center gap-4 mb-12">
                    <div class="w-36 h-36 rounded-full bg-gray-600 flex items-center justify-center">
                        <span class="text-5xl font-bold absolute m-auto">{{ detail.vote_average.toFixed(1) }}</span>
                        <ve-progress :progress="detail.vote_average * 10" :size="130" :color="vidStore.getColor(detail)" font-color="transparent" />
                    </div>
                    <UButton variant="none" class="group hover:scale-95 transition-all" @click="isOpen = true" :disabled="!trailerURL">
                        <template #leading>
                            <UIcon name="i-heroicons-play-circle" class="text-6xl md:text-9xl transition-all group-hover:text-pink-500" />
                        </template>
                        <span class="text-4xl xl:text-5xl font-light transition-all group-hover:text-pink-500">{{ $t('watch_trailer') }}</span>
                    </UButton>
                </div>
                <div class="mb-12">
                    <h4 class="text-4xl font-semibold mb-4">{{ $t('overview') }}</h4>
                    <p class="text-2xl md:text-xl leading-8 font-light">{{ detail.overview }}</p>
                </div>
                <ul class="flex justify-between pb-2 border-b border-b-gray-500 mb-8">
                    <li class="text-2xl md:text-xl">{{ $t('status') }}: <span class="ml-0 md:ml-3 text-gray-400">{{ detail.status }}</span></li>
                    <li v-if="detail.release_date" class="text-2xl md:text-xl">{{ $t('released_date') }}: <span class="ml-0 md:ml-3 text-gray-400">{{ detail.release_date }}</span></li>
                    <li v-if="detail.runtime" class="text-2xl md:text-xl">{{ $t('runtime') }}: <span class="ml-0 md:ml-3 text-gray-400">{{ detail.runtime }} min</span></li>
                    <li v-if="detail.first_air_date" class="text-2xl md:text-xl">{{ $t('first_air_date') }}: <span class="ml-0 md:ml-3 text-gray-400">{{ detail.first_air_date }}</span></li>
                </ul>
                <div v-if="directors.length" class="text-2xl pb-2 mb-8 border-b border-b-gray-500">
                    {{ $t('director') }}: 
                    <span class="ml-0 md:ml-3 text-gray-400 text-xl" v-for="(director, index) in directors" :key="index">
                        {{ director }}
                        <span v-if="index < (directors.length - 1)">,</span>
                    </span>
                </div>
                <div v-if="writers.length" class="text-2xl pb-2 mb-8 border-b border-b-gray-500">
                    {{ $t('writer') }}: 
                    <span class="ml-0 md:ml-3 text-gray-400 text-xl" v-for="(writer, index) in writers" :key="index">
                        {{ writer }}
                        <span v-if="index < (writers.length - 1)">,</span>
                    </span>
                </div>
                <div v-if="detail.created_by" class="text-2xl pb-2 mb-8 border-b border-b-gray-500">
                    {{ $t('creator') }}: 
                    <span class="ml-0 md:ml-3 text-gray-400 text-xl" v-for="(creator, index) in detail.created_by" :key="index">
                        {{ creator.name }}
                        <span v-if="index < (detail.created_by.length - 1)">,</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="top-cast mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">{{ $t('top_cast') }}</h1>
            <SwiperCarousel type="person" class="m-auto" :array="topCast" />
        </div>
        <div class="videos mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">{{ $t('official_videos') }}</h1>
            <SwiperCarousel type="video" class="m-auto" :array="videos" />
        </div>
        <div class="similar mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">{{ $t('similar') }}</h1>
            <SwiperCarousel type="movie-tv" :array="similars" />
        </div>
        <div class="recommendations mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">{{ $t('recommend') }}</h1>
            <SwiperCarousel type="movie-tv" :array="recommendations" />
        </div>
    </section>

    <UModal v-model="isOpen" :ui="{ background: 'bg-transparent' }">
      <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed/${trailerURL.key}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </UModal>
</template>

<script setup lang="ts">
const route = useRoute();
const { t, locale } = useI18n({ useScope: "global"});

// Skeleton in loading state
const { isLoading } = useLoadingIndicator();

const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

const isOpen = ref(false);

// card detail and infomation
const { data: detail } = await useAsyncData(
    'detail page',
    async () => {
        return await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}`, locale.value);
    },
    { watch: [locale] }
)

// fetch top cast
const { data: topCast } = await useAsyncData(
    'top cast',
    async () => {
        const { cast } = await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}/credits`, locale.value);
        return cast.filter(el => el.known_for_department === 'Acting');
    },
    { watch: [locale] }
)

// fetch director, writer
const { data: dirwri } = await useAsyncData(
    'director writer',
    async () => {
        const { crew } = await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}/credits`, locale.value);
        return crew.filter(el => (el.department ===  'Writing' || el.department === 'Directing'));
    },
    { watch: [locale] }
)

const directors = dirwri.value.filter(el => (el.job === "Director" || el.job === 'Co-Director')).map(el => el.name);
const writers = dirwri.value.filter(el => el.job === "Writer" ).map(el => el.name);

// fetch videos
const { data: videos } = await useAsyncData(
    'videos',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}/videos`, locale.value);
        return results;
    },
    { watch: [locale] }
)

// filter official trailer
const trailerURL = videos.value.filter(el => el.type === 'Trailer').filter(el => (el.name.includes('Official Trailer') || el.name.includes('Final Trailer') || el.name.includes('Trailer')))[0];

// fetch similar videos
const { data: similars } = await useAsyncData(
    'similar movie / tv',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}/similar`, locale.value);
        return results;
    },
    { watch: [locale] }
)

// fetch recommendations videos
const { data: recommendations } = await useAsyncData(
    'recommendations movie / tv',
    async () => {
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${route.params.genre}/${route.params.id}/recommendations`, locale.value);
        return results;
    },
    { watch: [locale] }
)

</script>

<style scoped>

</style>