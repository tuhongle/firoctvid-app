<template>
    <header>
        <Navbar />
    </header>
    <main>
        <slot />
    </main>
    <footer>
        <Footer />
    </footer>
</template>

<script setup lang="ts">
const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

await callOnce(async () => {
    const { genres } = await vidStore.getGenres('movie');
    genreMovies.value = genres;
});

await callOnce(async () => {
    const { genres } = await vidStore.getGenres('tv');
    genreTV.value = genres;
});
</script>