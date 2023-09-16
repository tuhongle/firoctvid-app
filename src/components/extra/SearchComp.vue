<template>
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5" ref="searchCards">
        <TransitionGroup name="card" appear>
            <div class="col mb-3" v-for="(item, index) in computedSearch" :key="index">
                <MovieTVCard :card="item"/>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useVidStore } from '../../stores/vidStore'
import MovieTVCard from '../cards/MovieTVCard.vue'

const props = defineProps<{
    query: string,
}>();

const vidStore = useVidStore();
vidStore.searchResults = [];

vidStore.searchResults.push(...await vidStore.getResults(props.query, 1));

const searchCards = ref(null);
const n = ref<number>(1);

window.onscroll = async () => {
    if (window.scrollY > 150) {
        vidStore.showNavbar = false;
    } else {
        vidStore.showNavbar = true;
    };
    const element = searchCards.value;
    if ((element! as HTMLCanvasElement).getBoundingClientRect().bottom < window.innerHeight) {
        n.value ++;
        const results = await vidStore.getResults(props.query, n.value);
        if (results.length) {
            vidStore.searchResults.push(...results);
        }
    };
}

const computedSearch = computed(() => {
    return vidStore.searchResults.sort((a, b) => b.popularity - a.popularity);
})

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