<template>
    <nav class="fixed top-0 left-0 right-0 py-4 md:py-8 bg-black bg-opacity-50">
        <div class="container flex items-center mx-auto">
            <NuxtLink to="/" class="flex items-center gap-0 md:gap-4">
                <span class="bg-gradient-to-tr from-orange-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center scale-75 md:scale-100">
                    <img src="~/assets/images/video.png" alt="video app icon" class="w-12">
                </span>
                <span class="navbar-title bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">FiroctVid</span>
            </NuxtLink>
            <ul class="flex items-center justify-between ms-auto gap-8">
                <li class="hidden md:block text-2xl text-white hover:text-pink-500 hover:cursor-pointer transition-all">
                    <NuxtLink to="/explore/movie">Movies</NuxtLink>
                </li>
                <li class="hidden md:block text-2xl text-white hover:text-pink-500 hover:cursor-pointer transition-all">
                    <NuxtLink to="/explore/tv">TV Shows</NuxtLink>
                </li>
                <li>
                    <UPopover :popper="{ offsetDistance: 20 }">
                        <UButton icon="i-heroicons-magnifying-glass-20-solid" class="text-white hover:text-pink-500" size="xl" variant="none"></UButton>

                        <template #panel>
                            <div class="w-screen">
                                <UInput class="px-3 py-2" padding="xl" size="xl" variant="none" placeholder="Search for a movie or tv show..." :ui="{size: {xl: 'text-xl lg:text-2xl'}}">
                                    <template #trailing>
                                        <UButton class="mr-8 hidden lg:block" size="xl" icon="i-heroicons-x-circle" variant="none" :ui="{size: {xl: 'text-xl'}}" />
                                    </template>
                                </UInput>
                            </div>
                        </template>
                    </UPopover>
                    <UButton icon="i-heroicons-bars-3-16-solid" variant="none" class="text-white md:hidden" size="xl"></UButton>
                </li>
            </ul>
        </div>
        <div v-if="false" class="dropdown flex flex-col items-end pe-4 gap-4">
            <NuxtLink to="/explore/movies" class="text-white text-xl hover:text-pink-500 hover:cursor-pointer transition-all">Movies</NuxtLink>
            <NuxtLink to="/explore/tv" class="text-white text-xl hover:text-pink-500 hover:cursor-pointer transition-all">TV Shows</NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">


</script>