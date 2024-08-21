<script setup lang="ts">
const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

const { t, locale } = useI18n({useScope: 'global'});

// await callOnce(async () => {
//     const { genres } = await vidStore.getGenres('movie', locale.value);
//     genreMovies.value = genres;
// });

const { data: localTVGenre } = await useAsyncData('TV genre', () => vidStore.getGenres('tv', locale.value), { watch: [locale]});

watch(
  locale,
  () => {
    setTimeout(() => {
      genreTV.value = localTVGenre.value.genres;
    }, 300);
  },
  { immediate: true}
)

const { data: localMoviesGenre } = await useAsyncData('movie genre', () => vidStore.getGenres('movie', locale.value), { watch: [locale]});

watch(
  locale,
  () => {
    setTimeout(() => {
      genreMovies.value = localMoviesGenre.value.genres;
    }, 300);
  },
  { immediate: true}
)
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all ease-in-out 1s;
}

.slide-leave-to,
.slide-enter-from {
  opacity: 0;
  /* transform: scale(0.5); */
  filter: blur(1rem);
}
</style>
