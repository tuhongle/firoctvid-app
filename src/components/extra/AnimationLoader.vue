<template>
    <div class="placeholder">
        &nbsp;
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@keyframes bganimate {
    0% {background-position: 50% 0}
    100% {background-position: -250% 0}
}
.placeholder {
    height: 100%;
    width: 100%;
    background: linear-gradient(to right, #173D77 0%, #2c74df 10%, #173D77 20%, #173D77 100%);
    background-size: 200% 100%;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
    animation: bganimate 3s linear infinite;
}
</style>