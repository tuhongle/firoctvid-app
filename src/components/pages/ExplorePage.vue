<template>
    <main class="bg-black text-light py-5" style="margin-top: 90px">
        <div class="container-xl">
            <div class="row gy-3 align-items-center mb-5">
                <div class="col-12 col-md-4">
                    <h3 class="mb-0">Explore {{ type }}</h3>
                </div>
                <div class="col-12 col-md-8 sorted">
                    <div class="row gap-2 me-1">
                        <div class="col position-relative px-0">
                            <label data-bs-toggle="dropdown" class="rounded-5 bg-blue d-flex align-items-center ps-2 pe-3 py-2">
                                <span class="px-3" v-if="!vidStore.selectGenres.length">Select Genres</span>
                                <div v-else class="d-flex align-items-center flex-wrap">
                                    <span class="bg-dark rounded-pill ps-3 pe-2 py-1 me-1 my-1 text-nowrap d-flex align-items-center" v-for="selectGenre in vidStore.selectGenres" :key="selectGenre" style="font-size: 0.6rem;">
                                        {{ selectGenre }}
                                        <button class="btn border-0 shadow-none p-0 text-bg-dark" 
                                        @click.stop="vidStore.selectGenres = vidStore.selectGenres.filter(el => el !== selectGenre)"
                                        >
                                        <i class="bi bi-x ms-1"></i>
                                    </button>
                                    </span>
                                </div>
                                <span class=" ms-auto fs-5 fw-lighter">|</span>
                                <i class="bi bi-chevron-down d-inline-block ms-2"></i>
                            </label>
                            <ul class="dropdown-menu start-0 w-100">
                                <li v-for="genre in computedGenres" :key="genre"><label class="dropdown-item fw-light">
                                    <input type="checkbox" :value="genre" v-model="vidStore.selectGenres" class="d-none">
                                    {{ genre }}
                                </label></li>
                            </ul>
                        </div>
                        <div class="col position-relative px-0">
                            <label data-bs-toggle="dropdown" class="rounded-5 bg-blue d-flex align-items-center ps-2 pe-3 py-2">
                                <div class="px-3">
                                    <span v-if="!vidStore.selectSortBy">Sort By</span>
                                    <span v-else>{{ vidStore.selectSortBy }}</span>
                                </div>
                                <span class="ms-auto fs-5 fw-lighter">|</span>
                                <i class="bi bi-chevron-down d-inline-block ms-2"></i>
                            </label>
                            <ul class="dropdown-menu start-0 w-100">
                                <li v-for="sortBy in vidStore.sortBy" :key="sortBy"><label class="dropdown-item fw-light">
                                    <input type="radio" :value="sortBy" v-model="vidStore.selectSortBy" class="d-none">
                                    {{ sortBy }}
                                </label></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        <!-- Explore Comp -->
            <Suspense>
                <ExploreComp :type="type" />
                <template #fallback>
                    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        <div class="col mb-3" v-for="n in 10" :key="n" style="min-height: 250px !important;">
                            <AnimationLoader />
                        </div>
                    </div>
                </template>
            </Suspense>
        <!-- ======= -->
        </div>
    </main>
</template>

<script setup lang="ts">
import ExploreComp from '../extra/ExploreComp.vue'
import AnimationLoader from '../extra/AnimationLoader.vue'
import { useVidStore } from '../../stores/vidStore'
import { computed, ref } from 'vue'

const vidStore = useVidStore();
vidStore.selectGenres = [];
vidStore.selectSortBy = '';

defineProps<{
    type: string,
}>();

const computedGenres = computed(() => {
    return vidStore.genres.filter(el => !vidStore.selectGenres.includes(el.name)).map(el => el.name);
})

</script>
