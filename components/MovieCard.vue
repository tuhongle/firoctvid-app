<template>
    <ULink :to="`/${genre}/${item.id}`">
        <UCard class="group bg-transparent rounded-2xl shadow-none border-none ring-0 hover:ring-pink-500 hover:shadow-2xl hover:shadow-pink-500 hover:scale-105 hover:cursor-pointer transition-all" :ui="{body: {padding: 'px-2 pb-4 sm:px-0 pb-4'}}">
            <div class="flex flex-col gap-10">
                <div class="relative group-hover:scale-95">
                    <img :src="(item.poster_path) ? `https://image.tmdb.org/t/p/original${item.poster_path}` : '/cardPlaceholder.jpeg'" alt="card thumbnail" loading="lazy" class="aspect-[2/3] rounded-2xl bg-cover group-hover:border group-hover:border-orange-500 transition-all">
                    <ul class="absolute bottom-0 right-0 -translate-x-2 -translate-y-2 flex flex-wrap justify-end gap-2 w-3/4">
                        <li class="bg-pink-500 text-xs px-2 py-1 text-white rounded-md shadow-md" v-for="(genre, index) in genreList" :key="index">{{ genre }}</li>
                    </ul>
                    <div v-if="item.vote_average" class="absolute bottom-0 left-0 translate-x-4 translate-y-1/2 w-14 h-14 rounded-full bg-white flex items-center justify-center">
                        <span class="text-black text-md font-bold absolute m-auto">{{ item.vote_average.toFixed(1) }}</span>
                        <client-only>
                            <ve-progress :progress="item.vote_average * 10" :color :size="50" :thickness="7" font-color="transparent" />
                        </client-only>
                    </div>
                </div>
                <div class="flex flex-col gap-3 px-2">
                    <h1 class="text-white text-xl md:text-2xl">
                        <span v-if="item.title">{{ item.title }}</span>
                        <span v-else>{{ item.name }}</span>
                    </h1>
                    <h6 class="text-gray-500 text-lg">
                        <span v-if="item.release_date">{{ item.release_date }}</span>
                        <span v-else>{{ item.first_air_date }}</span>
                    </h6>
                </div>
            </div>
        </UCard>
    </ULink>
</template>

<script setup lang="ts">
type MovieTv = {
    id: number,
    title: string,
    name: string,
    release_date: string,
    first_air_date: string,
    vote_average: number,
    poster_path: string,
    genre_ids: number[],
}

const { t, locale } = useI18n({ useScope: 'global' });

const vidStore = useVidStore();
const { genreMovies, genreTV } = storeToRefs(vidStore);

const props = defineProps<{
    item: MovieTv,
    // genreList: string[],
    color: string
}>();

const genre = (props.item.title) ? 'movie' : 'tv' ;

// get genre list of card
function getGenreList (item: MovieTv) {
    const genresArray = (item.title) ? genreMovies.value : genreTV.value;

    return genresArray.filter((el: {id: number}) => item.genre_ids.includes(el.id)).map((el: {name: string}) => el.name);
}

const genreList = ref<string[]>([]);

watch(
    locale,
    () => setTimeout(() => genreList.value = getGenreList(props.item), 300),
    { immediate: true }
)

</script>
