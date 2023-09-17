<template>
    <main class="bg-black text-light py-5" style="margin-top: 90px">
        <div class="container-xl">
            <div class="row gy-3 align-items-center mb-5">
                <div class="col">
                    <h3 class="mb-0">Search results of "{{ query.replace(/%20/g, ' ') }}"</h3>
                </div>
            </div>
        <!-- Explore Comp -->
            <Suspense>
                <SearchComp :query="query" />
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
import SearchComp from '../extra/SearchComp.vue'

defineProps<{
    query: string,
}>();

</script>
