<template>
    <div class="container mx-auto mt-44">
        <div class="flex flex-col md:flex-row gap-8 md:gap-4 items-center justify-between mb-8">
            <USkeleton class="h-16 w-1/3" />
            <div class="flex gap-4">
                <USkeleton class="h-12 w-48" :ui="{ rounded: 'rounded-full'}" />
                <USkeleton class="h-12 w-64" :ui="{ rounded: 'rounded-full'}" />
            </div>
        </div>
        <USkeleton class="h-16 w-full mb-8" :ui="{ rounded: 'rounded-full'}" />
        <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 py-8 overflow-y-auto overflow-x-hidden">
            <li v-for="n in 8" :key="n" >
                <USkeleton class="w-full aspect-[2/3]" />
            </li>
        </ul>
    </div>
</template>