<template>
    <RouterLink
    :to=" (card.media_type === 'movie') 
    ? { name: 'Details', params: { type: 'movie', id: card.id} }
    : { name: 'Details', params: { type: 'tv', id: card.id} }"
    class="text-decoration-none"
    >
        <div class="card rounded-4 bg-black text-light shadow-none border-0">
            <div class="card-header p-0 border-0 position-relative">
                <img 
                :src="card.poster_path ? 'https://image.tmdb.org/t/p/original'+card.poster_path : '/card.png'" 
                alt="poster path" class="card-img-top img-fluid rounded-4" width="200"
                loading="lazy"
                >
                <div class="genres position-absolute end-0 bottom-0 translate-middle-y">
                    <span class="text-bg-pink p-2 me-1 rounded-3 fw-light" v-if="genre_0">{{ genre_0.name }}</span>
                    <span class="text-bg-pink p-2 me-1 rounded-3 fw-light" v-if="genre_1">{{ genre_1.name }}</span>
                </div>
                <div class="circle-progress bg-light z-1 position-absolute start-0 bottom-0 d-flex align-items-center justify-content-center">
                    <div class="circle bg-success d-flex align-items-center justify-content-center"
                    :style="(card.vote_average >= 7) ?
                    {background: `conic-gradient(#198754 calc(${card.vote_average}*360deg/10), #f8f9fa 0deg)`} :
                    (card.vote_average >= 5 && card.vote_average < 7) ?
                    {background: `conic-gradient(#FFA500 calc(${card.vote_average}*360deg/10), #f8f9fa 0deg)`} :
                    {background: `conic-gradient(#FF4500 calc(${card.vote_average}*360deg/10), #f8f9fa 0deg)`}
                    ">
                        <span class="fw-bold text-bg-light z-2 d-flex align-items-center justify-content-center" v-if="card.vote_average">{{ card.vote_average.toFixed(1) }}</span>
                    </div>
                </div>
            </div>
            <div class="card-body pb-0 px-0 mt-3">
                <h5 class="card-title" v-if="card.original_title">{{ card.original_title }}</h5>
                <h5 class="card-title" v-else>{{ card.original_name }}</h5>
                <p class="card-text mb-1 text-secondary" v-if="props.card.release_date">{{ dayjs(props.card.release_date).format('MMM DD, YYYY') }}</p>
                <p class="card-text mb-1 text-secondary" v-if="props.card.first_air_date">{{ dayjs(props.card.first_air_date).format('MMM DD, YYYY') }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import {useVidStore} from '../../stores/vidStore'
import {type Genres, type MoviesTVCardType } from '../../types/vidTypes'

const vidStore = useVidStore();
const props = defineProps<{
    card: MoviesTVCardType,
}>();

const genre_0 = ref<Genres>();
const genre_1 = ref<Genres>();

if (props.card.genre_ids) {
    if (props.card!.genre_ids.length === 1) {
    genre_0.value = vidStore.genres.find(el => el.id === props.card.genre_ids![0]);
} else {
    genre_0.value = vidStore.genres.find(el => el.id === props.card.genre_ids![0]);
    genre_1.value = vidStore.genres.find(el => el.id === props.card.genre_ids![1]);
}
}

</script>

<style scoped lang="scss">
.card {
    transition: all 0.5s linear;
    * {
        transition: all 0.5s linear;
    }
    &:hover {
        transform: scale(0.97);
        * {
            transform: scale(0.97);
        }
        box-shadow: 0 0 30px 5px #da2f68 !important;
    }
    .genres {
        span {
            font-size: 0.6rem;
        }
    }
    .circle-progress {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transform: translate(20%, 30%);
        .circle {
            position: relative;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            font-size: 0.8rem;
            span {
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
        }
    }
}
</style>