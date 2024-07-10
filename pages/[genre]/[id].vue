<template>
    <section class="container text-white dark:text-black mx-4 md:mx-auto mt-44">
        <div class="hero grid grid-cols-12 gap-12 py-24">
            <div class="col-span-12 lg:col-span-5">
                <img src="https://image.tmdb.org/t/p/original/wWba3TaojhK7NdycRhoQpsG0FaH.jpg" alt="thumbnail image" class="aspect-[2/3] rounded-3xl">
            </div>
            <div class="col-span-12 lg:col-span-7">
                <h1 class="font-bold text-6xl mb-6">Despicable Me 4</h1>
                <h3 class="italic font-semibold text-4xl text-gray-400 mb-8">Things just got a little more despicable.</h3>
                <ul class="flex gap-4 mb-12">
                    <li class="px-3 py-2 bg-pink-500 rounded-lg font-medium">Animation</li>
                    <li class="px-3 py-2 bg-pink-500 rounded-lg font-medium">Animation</li>
                    <li class="px-3 py-2 bg-pink-500 rounded-lg font-medium">Animation</li>
                    <li class="px-3 py-2 bg-pink-500 rounded-lg font-medium">Animation</li>
                </ul>
                <div class="flex items-center gap-4 mb-12">
                    <div class="w-36 h-36 rounded-full bg-gray-500 flex items-center justify-center">
                        <span class="text-5xl font-bold absolute m-auto">7.7</span>
                        <ve-progress :progress="50" :size="130" font-color="transparent" />
                    </div>
                    <UButton variant="none" class="group hover:scale-95 transition-all">
                        <template #leading>
                            <UIcon name="i-heroicons-play-circle" class="text-8xl md:text-9xl transition-all group-hover:text-pink-500" />
                        </template>
                        <span class="text-4xl xl:text-6xl font-light transition-all group-hover:text-pink-500">Watch Trailer</span>
                    </UButton>
                </div>
                <div class="mb-12">
                    <h4 class="text-4xl font-semibold mb-4">Overview</h4>
                    <p class="text-2xl md:text-xl leading-8 font-light">Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.</p>
                </div>
                <ul class="flex justify-between pb-2 border-b border-b-gray-500 mb-8">
                    <li class="text-2xl md:text-xl">Status: <span class="ml-0 md:ml-3 text-gray-400">Released</span></li>
                    <li class="text-2xl md:text-xl">Released Date: <span class="ml-0 md:ml-3 text-gray-400">Released</span></li>
                    <li class="text-2xl md:text-xl">Runtime: <span class="ml-0 md:ml-3 text-gray-400">Released</span></li>
                </ul>
                <ul class="flex justify-between pb-2 border-b border-b-gray-500">
                    <li class="text-2xl">Director: <span class="ml-0 md:ml-3 text-gray-400">Released</span></li>
                    <li class="text-2xl">Writer: <span class="ml-0 md:ml-3 text-gray-400">Released</span></li>
                </ul>
            </div>
        </div>
        <div class="top-cast mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">Top Cast</h1>
            <SwiperCarousel type="person" class="m-auto" />
        </div>
        <div class="videos mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">Official Videos</h1>
            <SwiperCarousel type="video" />
        </div>
        <div class="similar mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">Similar Movies</h1>
            <SwiperCarousel type="movie-tv" />
        </div>
        <div class="recommendations mb-12">
            <h1 class="text-3xl lg:text-5xl font-bold mb-10">Recommendations</h1>
            <SwiperCarousel type="movie-tv" />
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>