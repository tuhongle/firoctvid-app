<template>
  <Suspense>
    <div>
      <ExplorePage :type="(Route.params.type === 'movie') ? 'Movies' : 'TV Shows'"/>
    </div>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import ExplorePage from "../components/pages/ExplorePage.vue"
import { useRoute } from "vue-router"

const Route = useRoute();
</script>