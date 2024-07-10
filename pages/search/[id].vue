<template>
    <section class="container mx-auto mt-40">
        <h1 class="text-4xl font-bold">Search results of "{{ id }}"</h1>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-8">
            <MovieCard v-for="n in 10" :key="n" />
        </div>
    </section>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id;


</script>

<style scoped>

</style>