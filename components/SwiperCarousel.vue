<template>
    <Swiper
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="1"
    :spaceBetween="10"
    :navigation="true"
    :loop="true"
    :autoplay="{
        delay: 20000,
        disableOnInteraction: true,
    }"
    :breakpoints="{
        '640': {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        '992': {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        '1024': {
            slidesPerView: 4,
            spaceBetween: 30,
        },
        '1280': {
            slidesPerView: 5,
            spaceBetween: 30,
        },
    }"
    class="default-swiper"
    >
        <SwiperSlide v-for="item in array" :key="item.id">

            <MovieCard v-if="type === 'movie-tv'" :item :color="vidStore.getColor(item)!" />

            <PersonalCard v-else-if="type === 'person'" :item />

            <VideoFrame v-else :item />

        </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">
import 'swiper/scss/navigation';
import type { MovieTv } from '~/types/vidType';

const props = defineProps<{
    type: string,
    array: any[],
}>();

const vidStore = useVidStore();

</script>

<style lang="scss">
.default-swiper {
    padding-bottom: 2rem;
    padding-top: 1rem;

    .swiper-button-prev,
    .swiper-button-next {
        background-size: cover;
        filter: invert(1);
        width: 48px;
        height: 48px;
        transition: all 0.15s linear;

        &:hover {
            filter: invert(19%) sepia(77%) saturate(2902%) hue-rotate(332deg) brightness(97%) contrast(109%);
            transform: scale(1.2);
        }

        &::after {
            content: " " !important;
        }
    }

    .swiper-button-prev {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMSA4YTcgNyAwIDEgMCAxNCAwQTcgNyAwIDAgMCAxIDhtMTAuMjUuNzVhLjc1Ljc1IDAgMCAwIDAtMS41SDYuNTZsMS4yMi0xLjIyYS43NS43NSAwIDAgMC0xLjA2LTEuMDZsLTIuNSAyLjVhLjc1Ljc1IDAgMCAwIDAgMS4wNmwyLjUgMi41YS43NS43NSAwIDEgMCAxLjA2LTEuMDZMNi41NiA4Ljc1eiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+") !important;
    }

    .swiper-button-next {
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE1IDhBNyA3IDAgMSAwIDEgOGE3IDcgMCAwIDAgMTQgME00Ljc1IDcuMjVhLjc1Ljc1IDAgMCAwIDAgMS41aDQuNjlMOC4yMiA5Ljk3YS43NS43NSAwIDEgMCAxLjA2IDEuMDZsMi41LTIuNWEuNzUuNzUgMCAwIDAgMC0xLjA2bC0yLjUtMi41YS43NS43NSAwIDAgMC0xLjA2IDEuMDZsMS4yMiAxLjIyeiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+");
    }
}
</style>