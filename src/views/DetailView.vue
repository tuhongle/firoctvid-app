<template>
    <Suspense>
        <DetailPage />
        <template #fallback>
            <div class="container-xl py-5 text-light" style="margin-top: 90px;">
                Loading...
            </div>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import DetailPage from '@/components/pages/DetailPage.vue'

</script>