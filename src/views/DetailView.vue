<template>
    <Suspense>
        <DetailPage />
        <template #fallback>
            <main class="bg-black text-light details">
                <div class="container-xl py-5 text-light">
                    <div class="hero row vh-100 py-5 align-items-center mb-5">
                        <div class="col-5 h-100">
                            <AnimationLoader />
                        </div>
                        <div class="col-7 h-100">
                            <div class="mb-2" style="height: 10%;">
                                <AnimationLoader />
                            </div>
                            <div class="mb-2" style="height: 20%;">
                                <AnimationLoader />
                            </div>
                            <div class="mb-2" style="height: 20%;">
                                <AnimationLoader />
                            </div>
                            <div style="height: 50%;">
                                <AnimationLoader />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import DetailPage from '@/components/pages/DetailPage.vue'
import AnimationLoader from '@/components/extra/AnimationLoader.vue'

</script>