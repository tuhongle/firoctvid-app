<template>
    <div class="grid grid-cols-12 gap-0 lg:gap-12 pt-40 pb-24 px-4 md:px-8 lg:px-12 xl:px-16 mb-12 mt-16">
        <div class="col-span-12 lg:col-span-5 mb-12 lg:mb-0">
            <USkeleton class="aspect-2/3 w-full h-[696px]" :ui="{ rounded: 'rounded-2xl' }" />
        </div>
        <div class="col-span-12 lg:col-span-7">
            <USkeleton class="h-16 w-full mb-6" />
            <USkeleton class="h-14 w-3/4 mb-12" />
            <USkeleton class="h-24 w-full mb-8" />
            <USkeleton class="h-14 w-1/4 mb-8" />
            <USkeleton class="h-48 w-full mb-6" />
            
            <ul class="flex justify-between pb-2 border-b border-b-gray-500 mb-8">
                <USkeleton class="h-14 w-full" />
            </ul>
        </div>
    </div>
</template>