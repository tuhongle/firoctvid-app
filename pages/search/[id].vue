<template>
    <section id="searchEl" class="container mx-auto mt-40">
        <h1 class="text-4xl font-bold text-white ml-4 md:ml-8 mb-8">Search results of "{{ id }}"</h1>
        <p v-if="!searchLists.length" class="ml-4 md:ml-8 text-2xl font-medium text-white mb-12">==> There is 0 result</p>
        <TransitionGroup v-else tag="ul" name="card" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 p-8 overflow-y-auto overflow-x-hidden">
            <li v-for="(item, index) in searchLists" :key="index">
                <MovieCard v-if="item.media_type === 'movie' || item.media_type === 'tv'" :item :genreList="getGenreList(item)" :color="vidStore.getColor(item)!" />
                <PersonalCard v-if="item.media_type === 'person'" class="m-auto" :item />
            </li>
        </TransitionGroup>
        <UProgress v-if="loading" class="mb-8" size="lg" color="pink" animation="carousel">
            <template #indicator>
                <p class="text-pink-500 m-auto text-2xl mb-2">Please wait...</p>
            </template>
        </UProgress>
    </section>
</template>

<script setup lang="ts">
import type { MovieTv } from '~/types/vidType';

const route = useRoute();
const id = route.params.id;

const { t, locale } = useI18n({useScope: 'global'});

const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

// get genre list of card
function getGenreList (item: MovieTv) {
    const genresArray = (item.title) ? genreMovies.value : genreTV.value;

    if (item.genre_ids) {
        return genresArray.filter((el: {id: number}) => item.genre_ids.includes(el.id)).map((el: {name: string}) => el.name);
    } else {
        return [];
    }
}

const { data: searchLists } = await useAsyncData('search lists', async () => {
    if (typeof id == 'string') {
        const { results } = await vidStore.getData('https://api.themoviedb.org/3/search/multi', locale.value, '1', id)
        return results;
    }
})

// infinite scroll to display more
const page = ref(2);
const loading = ref(false);

const getCardsOnScroll = async () => {
    if (page.value < 50) {
        let pageStr = page.value.toString();
        if (typeof id == 'string') {
            const { results } = await vidStore.getData('https://api.themoviedb.org/3/search/multi', locale.value, pageStr, id);
            results.forEach((result) => {
                searchLists.value.map(el => el.id).includes(result.id) ? null : searchLists.value.push(result);
            })
        }
    } else return;
};

onMounted(() => {
    const searchEl = document.getElementById('searchEl')!;

    const handleScroll = async () => {
        loading.value = true;
        if (searchEl.getBoundingClientRect().bottom < window.innerHeight) {
            await getCardsOnScroll();
            page.value ++;
        }
        loading.value = false;
    }

    window.addEventListener('scroll', handleScroll);
})

</script>

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