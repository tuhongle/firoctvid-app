import { options } from '#build/eslint.config.mjs';
import axios from 'axios'

export const useVidStore = defineStore('vid', () => {
    // declare variables
    const token_auth = useRuntimeConfig().public.tokenapi;
    const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${token_auth}`
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
        }
        return language;
    }

    const getURL = (type : string) => {
        let url = '';
        switch (type) {
            case 'trending':
                url = 'https://api.themoviedb.org/3/trending/';
                break;
        }
        return url;
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
    const getData = async (url : string, lang : string = 'en', page: string = '1') => {
        const options = {
            method: 'GET',
            url: url,
            params: {language: getLanguage(lang), page: page},
            headers: headers,
        };

        try {
            const { data } = await axios.request(options);
            return data;
        } catch (err) {
            console.log(err);
        }
    }
    
    return {
        genreMovies, genreTV,
        trendingTime, trendingType, popularType, ratedType,
        trending, popular, rated,
        getRandomImage,
        getData,
        getGenres,
    }
})

if (import.meta.hot) {
import.meta.hot.accept(acceptHMRUpdate(useVidStore, import.meta.hot))
}