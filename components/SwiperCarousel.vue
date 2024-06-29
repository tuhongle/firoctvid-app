<template>
    <Swiper
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="1"
    :spaceBetween="10"
    :navigation="true"
    :loop="true"
    :autoplay="{
        delay: 5000,
        disableOnInteraction: true,
    }"
    :breakpoints="{
        '640': {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        '992': {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        '1024': {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    }"
    >
        <SwiperSlide v-for="slide in 10" :key="slide">
            <MovieCard />
        </SwiperSlide>
    </Swiper>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>