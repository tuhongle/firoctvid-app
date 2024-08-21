<script setup lang="ts">
definePageMeta({
    pageTransition: {
        name: 'slide',
        mode: 'out-in'
    }
})

// declare locale u18n
const { t, locale } = useI18n({useScope: "global"});

// loading state indicator Skeleton
const { isLoading } = useLoadingIndicator();

import type { MovieTv } from '@/types/vidType.ts'

const route = useRoute();
const genre = route.params.genre;

const vidStore = useVidStore();
const { genreTV, genreMovies, sortLists, movieLists, tvLists } = storeToRefs(vidStore);

const genres = ref<string[]>([]);

const selectedGenre = ref<string[]>([]);
const list = ref<string>();
const sortBy = ref<string>();

const loading = ref(false);
const isChanging = ref(false);
const page = ref(2);

let initialExplorerLists : any[];

function getMovieListType (str: string) {
    switch (str) {
        case movieLists.value[0]:
            return 'now_playing';
        case movieLists.value[1]:
            return 'popular';
        case movieLists.value[2]:
            return 'top_rated';
        case movieLists.value[3]:
            return 'upcoming';
    }
}

function getTVListType (str: string) {
    switch (str) {
        case tvLists.value[0]:
            return 'airing_today';
        case tvLists.value[1]:
            return 'popular';
        case tvLists.value[2]:
            return 'top_rated';
        case tvLists.value[3]:
            return 'on_the_air';
    }
}

// watch changing of sortBy and List to appear skeleton
watch(
    [sortBy, list],
    () => isChanging.value = true,
    { immediate: true}
);

// Get data sortlists, movielists, tvlists (get data run first - no delay)
watch(
    locale,
    () => {
        sortLists.value = [t('sortLists[0]'), t('sortLists[1]'), t('sortLists[2]'), t('sortLists[3]'), t('sortLists[4]'), t('sortLists[5]'), t('sortLists[6]'), t('sortLists[7]')];
        movieLists.value = [t('movieLists[0]'), t('movieLists[1]'), t('movieLists[2]'), t('movieLists[3]')];
        tvLists.value = [t('tvLists[0]'), t('tvLists[1]'), t('tvLists[2]'), t('tvLists[3]')];
        list.value = t('movieLists[1]');
        sortBy.value = t('sortLists[0]');
    },
    { immediate: true }
)

// useAsyncDate with watch route changing
const { data: explorerLists } = await useLazyAsyncData('genre Lists', async () => {
        page.value = 2;
        let listType = (genre === 'movie') ? getMovieListType(list.value) : getTVListType(list.value);
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${genre}/${listType}`, locale.value, "1");
        initialExplorerLists = results;
        return results;
}, { watch : [() => genre, () => list.value, locale], immediate: true });

// watch to get genres list
watch(
    [locale, () => genre],
    () => setTimeout(() => (genre === 'movie') ? genres.value = genreMovies.value.map((el : {name: string}) => el.name) : genres.value = genreTV.value.map((el : {name: string}) => el.name), 300),
    { immediate: true }
)

// infinite scroll to display more
const getMovieTVsOnScroll = async () => {
    if (page.value < 50) {
        let listType = (genre === 'movie') ? getMovieListType(list.value) : getTVListType(list.value);
        let pageStr = page.value.toString();
        const { results } = await vidStore.getData(`https://api.themoviedb.org/3/${genre}/${listType}`, locale.value, pageStr);
        results.forEach((result) => {
            explorerLists.value.map(el => el.id).includes(result.id) ? null : explorerLists.value.push(result);
        })
    } else return;
}

onMounted(() => {
    const listEl = document.getElementById('listEl')!;

    const handleScroll = async () => {
        loading.value = true;
        if (listEl.getBoundingClientRect().bottom < window.innerHeight) {
            await getMovieTVsOnScroll();
            page.value ++;
        }
        initialExplorerLists = explorerLists.value;
        loading.value = false;
    }

    window.addEventListener('scroll', handleScroll);
})

// sort genre select
watch(
    [selectedGenre, page],
    () => {
        setTimeout(() => {
            let convertedLists : { id: number, name: string }[] = (genre === 'movie') ? genreMovies.value : genreTV.value;
            if (selectedGenre.value.length) {
                explorerLists.value = initialExplorerLists.filter(list => convertedLists.filter(el => selectedGenre.value.includes(el.name)).map(el => el.id).every(el => list.genre_ids.includes(el)))
            } else {
                explorerLists.value = initialExplorerLists;
            }
        }, 200)
    },
)

// Sort lists Function
function handleSortBy (filter: string, order: number = 1 | 0) {
    if (order === 1) {
        switch (filter) {
            case 'popularity':
                explorerLists.value.sort((a, b) => a.popularity - b.popularity);
                break;
            case 'rating':
                explorerLists.value.sort((a, b) => a.vote_average - b.vote_average);
                break;
            case 'date':
                (genre === 'movie') ? explorerLists.value.sort((a, b) => (new Date(a.release_date)).valueOf() - (new Date(b.release_date)).valueOf()) : explorerLists.value.sort((a, b) => (new Date(a.first_air_date)).valueOf() - (new Date(b.first_air_date)).valueOf());
                break;
            case 'title':
                (genre === 'movie') ? explorerLists.value.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 1) : explorerLists.value.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);
                break;
        }
    } else if (order === 0) {
        switch (filter) {
            case 'popularity':
                explorerLists.value.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'rating':
                explorerLists.value.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'date':
                (genre === 'movie') ? explorerLists.value.sort((a, b) => (new Date(b.release_date)).valueOf() - (new Date(a.release_date)).valueOf()) : explorerLists.value.sort((a, b) => (new Date(b.first_air_date)).valueOf() - (new Date(a.first_air_date)).valueOf());
                break;
            case 'title':
                (genre === 'movie') ? explorerLists.value.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1) : explorerLists.value.sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1);
                break;
        }
    };
}

// sort explorerLists by sortBy
watch(
    [sortBy, page, list],
    () => {
        setTimeout(() => {
            switch (sortBy.value) {
                case 'Popularity Ascending':
                    handleSortBy('popularity', 1);
                    break;
                case 'Popularity Descending':
                    handleSortBy('popularity', 0);
                    break;
                case 'Rating Ascending':
                    handleSortBy('rating', 1);
                    break;
                case 'Rating Descending':
                    handleSortBy('rating', 0);
                    break;
                case 'Release Date Ascending':
                    handleSortBy('date', 1);
                    break;
                case 'Release Date Descending':
                    handleSortBy('date', 0);
                    break;
                case 'Title (A-Z)':
                    handleSortBy('title', 1);
                    break;
                case 'Title (Z-A)':
                    handleSortBy('title', 0);
                    break;
            };
            isChanging.value = false;
        }, 500);
    },
    { immediate: true }
)

</script>

<template>
    <SkeletonLists v-if="isLoading" />

    <section v-else id="listEl" class="container mx-auto mt-44">
        <div class="flex flex-col md:flex-row gap-8 md:gap-4 justify-between mb-8">
            <h1 class="text-4xl font-bold text-white">{{ $t('explorer') }} {{ (genre === 'movie') ? $t('movie') : $t('show') }}</h1>
            <div class="flex gap-4">
                <USelectMenu v-if="genre === 'movie'" size="xl" padding="xl" v-model="list" :options="movieLists" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-48', rounded: 'rounded-full', padding: { xl: 'px-6 py-3'}}" />
                <USelectMenu v-else size="xl" padding="xl" v-model="list" :options="tvLists" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-48', rounded: 'rounded-full', padding: { xl: 'px-6 py-3'}}" />
                <USelectMenu size="xl" padding="xl" v-model="sortBy" :options="sortLists" placeholder="Sort By" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-64', rounded: 'rounded-full', padding: { xl: 'px-6 py-3'}}" />
            </div>
        </div>
        <div class="mb-8">
            <USelectMenu multiple searchable :searchable-placeholder="$t('search_genre')" size="xl" padding="xl" v-model="selectedGenre" :options="genres" :placeholder="$t('search_placeholder')" :popper="{ offsetDistance: 10 }" :ui="{ base: 'w-full', rounded: 'rounded-full', padding: { xl: 'px-8 py-4'}}" :ui-menu="{ padding: 'px-3', option: { padding: 'px-3 py-2'}, height: 'max-h-96'}">
                <template #label>
                    <ul v-if="selectedGenre.length" class="flex flex-wrap gap-2">
                        <li v-for="selected in selectedGenre" class="truncate bg-gray-200 rounded-full px-4 py-1.5">{{ selected }}</li>
                    </ul>
                </template>
            </USelectMenu>
        </div>

        <!-- skeleton for changing list and sortBy -->
        <ul v-if="isChanging" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 py-8 overflow-y-auto overflow-x-hidden">
            <li v-for="n in 5" :key="n" >
                <USkeleton class="w-full aspect-[2/3]" />
            </li>
        </ul>
        <!-- ============= -->
        
        <TransitionGroup v-else tag="ul" name="card" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 py-8 overflow-y-auto overflow-x-hidden">
            <li v-for="(item, index) in explorerLists" :key="index" >
                <MovieCard :item :color="vidStore.getColor(item)!" />
            </li>
        </TransitionGroup>
        <UProgress v-if="loading" class="mb-8" size="lg" color="pink" animation="carousel">
            <template #indicator>
                <p class="text-pink-500 m-auto text-2xl mb-2">Please wait...</p>
            </template>
        </UProgress>
    </section>
</template>

<style scoped lang="scss">
.card-enter-active,
.card-leave-active {
    transition: all 0.3s ease-in-out;
}

.card-enter-from,
.card-leave-to {
    // transform: scale(0.1);
    opacity: 0;
}
</style>