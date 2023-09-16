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
                    Loading...
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
