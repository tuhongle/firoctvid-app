<template>
  <Suspense>
    <div>
      <SearchPage :query="(Route.params.id as string)"/>
    </div>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import SearchPage from "../components/pages/SearchPage.vue"
import { useRoute } from "vue-router"

const Route = useRoute();
</script>