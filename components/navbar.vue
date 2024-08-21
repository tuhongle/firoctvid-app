<template>
    <nav id="navbar" class="fixed top-0 left-0 right-0 py-4 md:py-6 bg-bodydark bg-opacity-50 transition-all shadow-2xl shadow-bodydark z-[1000]">
        <div class="container flex items-center mx-auto">
            <NuxtLink to="/" class="flex items-center gap-0 md:gap-4">
                <span class="bg-gradient-to-tr from-orange-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center scale-75 md:scale-100">
                    <img src="~/assets/images/video.png" alt="video app icon" class="w-12">
                </span>
                <span class="navbar-title bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-bold">FiroctVid</span>
            </NuxtLink>
            <ul class="flex items-center justify-between ms-auto gap-8">
                <USelectMenu :options="langs" v-model="$i18n.locale" variant="none" :ui="{ variant: { none: 'px-4 ring-1 ring-inset ring-white focus:ring-2 focus:ring-pink-400'}}">
                    <template #label>
                        <span class="uppercase text-white">{{ $i18n.locale }}</span>
                    </template>

                    <template #option="{ option: language }">
                        <span class="uppercase">{{ language }}</span>
                    </template>
                </USelectMenu>
                <li class="hidden md:block text-2xl text-white hover:text-pink-500 hover:cursor-pointer transition-all">
                    <NuxtLink to="/explore/movie">{{ $t('movie') }}</NuxtLink>
                </li>
                <li class="hidden md:block text-2xl text-white hover:text-pink-500 hover:cursor-pointer transition-all">
                    <NuxtLink to="/explore/tv">{{ $t('show') }}</NuxtLink>
                </li>
                <li>
                    <UPopover :popper="{ offsetDistance: 20 }" v-model:open="openSearch">
                        <UButton icon="i-heroicons-magnifying-glass-20-solid" class="text-white hover:text-pink-500" size="xl" variant="none"></UButton>

                        <template #panel>
                            <div class="w-screen">
                                <UInput class="px-3 py-2" padding="xl" size="xl" variant="none" v-model="searchInput" :placeholder="$t('hero_placeholder')" :ui="{size: {xl: 'text-xl lg:text-2xl'}}" @keydown.enter="vidStore.handleSearch(searchInput); openSearch = false;">
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
            <NuxtLink to="/explore/movies" class="text-white text-xl hover:text-pink-500 hover:cursor-pointer transition-all">{{ $t('movie') }}</NuxtLink>
            <NuxtLink to="/explore/tv" class="text-white text-xl hover:text-pink-500 hover:cursor-pointer transition-all">{{ $t('show') }}</NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
const openSearch = ref(false);

const vidStore = useVidStore();
const { searchInput, lang } = storeToRefs(vidStore);

const langs = ['en', 'fr', 'es', 'de', 'vi'];

onMounted(() => {
    const navbar = document.getElementById('navbar')!;
    const navbarHeight = navbar!.offsetHeight;
    
    let lastScrollY = 0;

    window.onscroll = () => {
        if (window.scrollY < lastScrollY) {
            navbar?.classList.remove('-translate-y-[7rem]');
            if (window.scrollY < navbarHeight) {
                navbar.classList.replace('bg-opacity-95', 'bg-opacity-50');
            };
        } else {
            if (window.scrollY > navbarHeight * 2) {
                navbar?.classList.add('-translate-y-[7rem]');
                navbar.classList.replace('bg-opacity-50', 'bg-opacity-95');
            }
        }
        lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY;
    }
})

// watch locale changing
const { locale, setLocale } = useI18n();

// watch(
//     lang,
//     () => {
//         setLocale(lang.value);
//     },
//     { immediate: true}
// )

</script>