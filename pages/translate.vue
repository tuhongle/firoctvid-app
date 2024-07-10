<script setup>
const { locale, setLocale } = useI18n()
</script>

<template>
  <div class="mt-44 text-white">
    <div class="flex gap-4">
      <button @click="setLocale('en')">en</button>
      <button @click="setLocale('fr')">fr</button>
      <button @click="setLocale('es')">fr</button>
      <button @click="setLocale('vi')">fr</button>
    </div>
    <p>{{ $t('welcome') }}</p>
  </div>
</template>
