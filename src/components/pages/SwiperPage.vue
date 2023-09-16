<template>
    <div class="row">
        <div class="col">
            <swiper
                :slidesPerView="2"
                :spaceBetween="20"
                :navigation="true"
                :breakpoints="{
                    '768': {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    '992': {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    '1200': {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide v-for="(item, index) in array" :key="index">
                    <div v-if="content === 'MovieTVCard'">
                        <MovieTVCard :card="item"/>
                    </div>
                    <div v-if="content === 'PersonCard'">
                        <PersonCard :card="item" />
                    </div>
                    <div v-if="content === 'VideosCard'">
                        <VideosCard :card="item" />
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import MovieTVCard from '../cards/MovieTVCard.vue'
import PersonCard from '../cards/PersonCard.vue'
import VideosCard from '../cards/VideosCard.vue'

import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"

const modules = [Navigation];

defineProps<{
    array: any[] | undefined,
    content: string,
}>();
</script>

