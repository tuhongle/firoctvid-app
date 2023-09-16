<script setup lang="ts">
import HomePage from '../components/pages/HomePage.vue'

</script>

<template>
  <Suspense>
    <HomePage />
    <template #fallback>
      <div class="vh-100">
        <div class="spinner-grow display-1" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </Suspense>
</template>
