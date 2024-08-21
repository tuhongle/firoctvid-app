import type { person, MovieTv } from '@/types/vidType'
import axios from 'axios'

export const useVidStore = defineStore('vid', () => {
    // declare u18n
    const { t, locale } = useI18n({ useScope: 'global'});

    // declare variables
    const token_auth = useRuntimeConfig().public.tokenapi;
    // const headers = {
    //     accept: 'application/json',
    //     Authorization: `Bearer ${token_auth}`
    // }

    const headers = {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjNlNTkyOWUxNGE1ZmFlMDYzYTBhNWUxMTNjMjc5ZSIsIm5iZiI6MTcyMDUxMjExNS41NTk2OTEsInN1YiI6IjY0MDhjOTAxZDc1YmQ2MDA4NjJlYjFiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.li2pmaoT1Pls63R72_r85HchC22c1HjiW3f0N14p558`
    }

    const genreMovies = ref([]);
    const genreTV = ref([]);

    const trendingType = ref('movie');
    const trendingTime = ref('day');
    const popularType = ref('movie');
    const ratedType = ref('movie');

    const trending = ref([]);
    const popular = ref([]);
    const rated = ref([]);

    const searchInput = ref('');

    const timeItems = ref<{label: string}[]>([]);
    const typeItems = ref<{label: string}[]>([]);

    // declare genreList in explore genre
    const sortLists = ref<string[]>([]);
    const movieLists= ref<string[]>([]);
    const tvLists= ref<string[]>([]);

    // get Language at present
    const getLanguage = (lang : string) => {
        let language = '';
        switch (lang) {
            case 'en':
                language = 'en-US';
                break;
            case 'fr':
                language = 'fr-FR';
                break;
            case 'es':
                language = 'es-ES';
                break;
            case 'vi':
                language = 'vi-VN';
                break;
            case 'de':
                language = 'de-DE';
                break;
        }
        return language;
    }

    const getRandomImage = async (id: number) => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/images`,
            headers: headers,
          };

        try {
            const { data } = await axios.request(options);
            if (data.backdrops) return data.backdrops[0].file_path;
        } catch (err) {
            console.log(err)
        }
    }

    // get Genres based on movies or tv
    const getGenres = async (genre: string, lang: string = 'en-US') => {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/genre/${genre}/list`,
            params: {language: getLanguage(lang)},
            headers: headers
        };

        try {
           const { data } = await axios.request(options);
           return data;
        } catch (err) {
            console.log(err)
        }
    }

    // function to get data from tmdb
    const getData = async (url : string, lang : string = 'en', page: string = '1', queryStr: string = '') => {
        const options = {
            method: 'GET',
            url: url,
            params: {query: queryStr, language: getLanguage(lang), page: page},
            headers: headers,
        };

        try {
            const result = await axios.request(options);
            return result.data;
        } catch (err) {
            console.log(err);
        }
    }

    // color of ve-progress
    function getColor (item: MovieTv) {
        switch (true) {
            case (item.vote_average > 8.4):
                return '#1ABC9C';
            case (item.vote_average > 7 && item.vote_average <= 8.4):
                return '#6546f7';
            case (item.vote_average <= 7 && item.vote_average > 5):
                return 'orange';
            case (item.vote_average <= 5):
                return 'red';
        }
    }

    // handle Search
    const handleSearch = (input: string) => {
        const query = input.toLocaleLowerCase().replace(/ /g,"%20");
        navigateTo(`/search/${query}`);
    }
    
    return {
        genreMovies, genreTV,
        trendingTime, trendingType, popularType, ratedType,
        trending, popular, rated,
        searchInput,
        timeItems, typeItems,
        sortLists, movieLists, tvLists,
        getRandomImage,
        getData,
        getGenres,
        getColor,
        handleSearch,
    }
})

if (import.meta.hot) {
import.meta.hot.accept(acceptHMRUpdate(useVidStore, import.meta.hot))
}