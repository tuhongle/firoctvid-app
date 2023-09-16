<template>
    <div  class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" ref="exploreCards">
        <TransitionGroup name="card" appear>
            <div class="col mb-3" v-for="(item, index) in computedExplores" :key="index">
                <MovieTVCard :card="item"/>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MovieTVCard from '../cards/MovieTVCard.vue'
import { useVidStore } from '@/stores/vidStore'
import { type MoviesTVCardType } from '../../types/vidTypes';

const props = defineProps<{
    type: string,
}>();

const vidStore = useVidStore();

const loadContent = async(n: number) => {
    if (props.type === 'Movies') {
    await vidStore.getExplore('movie', n);
    } else {
        await vidStore.getExplore('tv', n);
    }
};

vidStore.explores = [];
await loadContent(1);

const exploreCards = ref(null);
const n = ref<number>(1);

window.onscroll = async () => {
    if (window.scrollY > 150) {
        vidStore.showNavbar = false;
    } else {
        vidStore.showNavbar = true;
    };
    const element = exploreCards.value;
    if ((element! as HTMLCanvasElement).getBoundingClientRect().bottom < window.innerHeight) {
        n.value ++;
        await loadContent(n.value);
    };
}

const computedExplores = computed<MoviesTVCardType[]>(() => {
    const filterExplores = (!vidStore.selectGenres.length) ? vidStore.explores : vidStore.explores.filter(el => {
                                const currentGenres = el.genre_ids!.map(el => vidStore.genres.find(ele => ele.id ===el)?.name);
                                return currentGenres.some(el => vidStore.selectGenres.indexOf(el!) >= 0);
                            });
    switch (vidStore.selectSortBy) {
        case 'Popularity Ascending':
            return filterExplores.sort((a, b) => a.popularity - b.popularity);
        case 'Popularity Descending':
            return filterExplores.sort((a, b) => b.popularity - a.popularity);
        case 'Rating Ascending':
            return filterExplores.sort((a, b) => a.vote_average - b.vote_average);
        case 'Rating Descending':
            return filterExplores.sort((a, b) => b.vote_average - a.vote_average);
        case 'Release Date Ascending':
            if (props.type === 'Movies') {
                return filterExplores.sort((a, b) => new Date(a.release_date!).getTime() - new Date(b.release_date!).getTime());
            } else {
                return filterExplores.sort((a, b) => new Date(a.first_air_date!).getTime() - new Date(b.first_air_date!).getTime());
            };
        case 'Release Date Descending':
            if (props.type === 'Movies') {
                return filterExplores.sort((a, b) => new Date(b.release_date!).getTime() - new Date(a.release_date!).getTime());
            } else {
                return filterExplores.sort((a, b) => new Date(b.first_air_date!).getTime() - new Date(a.first_air_date!).getTime());
            };
        case 'Title (A-Z)':
            if (props.type === 'Movies') {
                return filterExplores.sort((a, b) => a.original_title!.toLowerCase() < b.original_title!.toLowerCase() ? -1 : 1);
            } else {
                return filterExplores.sort((a, b) => a.original_name!.toLowerCase() < b.original_name!.toLowerCase() ? -1 : 1);
            };
        default:
            return filterExplores;
    }
});

</script>

<style lang="scss" scoped>
.card-enter-from,
.card-leave-to {
    opacity: 0;
    transform: scale(0.5);
}

.card-enter-active,
.card-leave-active,
.card-move {
    transition: all 1s ease;
}
</style>