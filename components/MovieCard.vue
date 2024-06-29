<template>
    <UCard class="group bg-transparent rounded-2xl shadow-none border-none ring-0 hover:ring-pink-500 hover:shadow-lg hover:shadow-pink-300 hover:scale-105 transition-all">
        <div class="flex flex-col gap-10">
            <div class="relative">
                <img src="https://image.tmdb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg" alt="card thumbnail" class="aspect-[2/3] rounded-2xl bg-cover group-hover:scale-95 group-hover:border group-hover:border-orange-500 transition-all">
                <ul class="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 flex flex-wrap justify-end gap-2">
                    <li class="bg-pink-500 text-md px-2 py-1 text-white rounded-md">Adventure</li>
                    <li class="bg-pink-500 text-md px-2 py-1 text-white rounded-md">Fiction</li>
                    <li class="bg-pink-500 text-md px-2 py-1 text-white rounded-md">Scientic</li>
                </ul>
                <div class="absolute bottom-0 left-0 translate-x-4 translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    <span class="text-black text-md font-bold absolute m-auto">7.7</span>
                    <circle-progress :percent="75" :size="50" :border-width="5" :border-bg-width="8" fill-color="#fe0000" empty-color="#FFF" />
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <h1 class="text-white text-3xl md:text-2xl">Furiosa: A Mad Max Saga</h1>
                <h6 class="text-gray-500 text-lg">May 22, 2024</h6>
            </div>
        </div>
    </UCard>
</template>

<script setup lang="ts">
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";

</script>
