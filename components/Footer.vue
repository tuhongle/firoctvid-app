<template>
    <div class="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white mx-auto py-6 text-xl">
        <NuxtLink to="/terms-of-use" class="hover:text-pink-500 transition-all hover:cursor-pointer text-center">{{ $t('footer[0]') }}</NuxtLink>
        <NuxtLink to="/privacy-policy" class="hover:text-pink-500 transition-all hover:cursor-pointer text-center">{{ $t('footer[1]') }}</NuxtLink>
        <NuxtLink class="hover:text-pink-500 transition-all hover:cursor-pointer text-center">{{ $t('footer[2]') }}</NuxtLink>
        <NuxtLink to="/faq" class="hover:text-pink-500 transition-all hover:cursor-pointer text-center">{{ $t('footer[3]') }}</NuxtLink>
    </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n({useScope: "global"});
</script>

<style scoped>

</style>