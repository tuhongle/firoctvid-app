import { defineStore } from "pinia"
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'  
import { type Genres, type MovieTV, type MoviesTVCardType, type PopularTopRated, type personCardType, type videosCardType, type Crew, type DetailType } from "@/types/vidTypes"

export const useVidStore = defineStore('vid', () => {
    const Router = useRouter();
    const showNavbar = ref<boolean>(true);
    const showSearch = ref<boolean>(false);
    const searchInput = ref<string>('');
    const api_key = import.meta.env.VITE_API_KEY;
    const baseURL = 'https://api.themoviedb.org/3/';
    const imgURL = 'https://image.tmdb.org/t/p/original';
    const backgroundURL = ref<string>('');
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api_key}`
        }
    };

    const genres = ref<Genres[]>([]);
    const trending = ref([]);
    const DayWeek = ref<'day' | 'week'>('day');

    const moviesPopular = ref([]);
    const tvPopular = ref([]);
    const topRatedMovies = ref([]);
    const topRatedTV = ref([]);

    const urlTales = ref<string[]>(['?language=en-US', '/credits?language=en-US', '/videos?language=en-US', '/similar?language=en-US&page=1', '/recommendations?language=en-US&page=1']);
    const detail = ref<DetailType>();
    const cast = ref<personCardType[]>();
    const crew = ref<Crew[]>();
    const videos = ref<videosCardType[]>();
    const similar = ref();
    const recommend = ref();

    const explores = ref<MoviesTVCardType[]>([]);
    const sortBy = ['Popularity Descending', 'Popularity Ascending', 'Rating Descending', 'Rating Ascending', 'Release Date Descending', 'Release Date Ascending', 'Title (A-Z)'];
    const selectGenres = ref<string[]>([]);
    const selectSortBy = ref<string>('');

    const searchResults = ref<MoviesTVCardType[]>([]);

    const getGenres = async (query: string) => {
        const URL = `${baseURL}genre/${query}/list?language=en`;
        const response = await fetch(URL, options);
        const data = await response.json();
        return data.genres;
    }

    const getTrending = async (query : 'day' | 'week') => {
        const URL = `${baseURL}trending/movie/${query}?language=en-US`;
        const response = await fetch(URL, options);
        const data = await response.json();
        genres.value = await getGenres('movie');
        trending.value = data.results;
        DayWeek.value = query;
        const backgroundArray = trending.value.map((el : any) => el.backdrop_path)
        const i = Math.floor(Math.random() * 19);
        backgroundURL.value = `${imgURL}${backgroundArray[i]}`;
    }

    const getMovieTV = async (a : MovieTV, b: PopularTopRated) => {
        const URL = `https://api.themoviedb.org/3/${a}/${b}`;
        const response = await fetch(URL, options);
        const data = await response.json();
        data.results = data.results.map((el : MoviesTVCardType) => {
            return { media_type: `${a}`, ...el}
        });
        genres.value = await getGenres(a);
        const ab = `${a}_${b}`;
        switch (ab) {
            case 'movie_popular':
                moviesPopular.value = data.results;
                tvPopular.value = [];
                break;
            case 'tv_popular':
                moviesPopular.value = [];
                tvPopular.value = data.results;
                break;
            case 'movie_top_rated':
                topRatedMovies.value = data.results;
                topRatedTV.value = [];
                break;
            case 'tv_top_rated':
                topRatedMovies.value = [];
                topRatedTV.value = data.results;
                break;
        };
    }

    const getExplore = async (type: MovieTV, query: number) => {
        const URL = `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${query}`;
        const response = await fetch(URL, options);
        const data = await response.json();
        genres.value = await getGenres(type);
        data.results = data.results.map((el: MoviesTVCardType) => {
            return { media_type: `${type}`, ...el}
        });
        explores.value.push(...data.results);
    }

    const getDetails = async (type: MovieTV, id : string, tale: string) => {
        const URL = `${baseURL}${type}/${id}${tale}`;
        const response = await fetch(URL, options);
        const data = await response.json();
        switch (tale) {
            case urlTales.value[0]:
                genres.value = await getGenres(type);
                detail.value = data;
                break;
            case urlTales.value[1]:
                cast.value = data.cast;
                crew.value = data.crew;
                break;
            case urlTales.value[2]:
                videos.value = data.results;
                break;
            case urlTales.value[3]:
                similar.value = data.results;
                break;
            case urlTales.value[4]:
                recommend.value = data.results;
                break;
        }
    }

    const getResults = async(a : string, b: number) => {
        const query = a.replace(/\s/g, '%20');
        const URL = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=${b}`;
        const response = await fetch(URL, options);
        const data = await response.json();
        return data.results;
    }

    const search = async(a: string) => {
        const query = a.replace(/\s/g, '%20');
        Router.push({name: 'search', params: { id: query}});
        showSearch.value = false;
        searchInput.value = '';
    }

    getResults('barbie', 1)

    return {
        showNavbar, showSearch, searchInput, imgURL, trending, genres, DayWeek, backgroundURL, moviesPopular, tvPopular, topRatedMovies, topRatedTV, detail, cast, crew, videos, similar, recommend, urlTales, sortBy, explores, selectGenres, selectSortBy, searchResults
        , getTrending, getMovieTV, getDetails, getExplore, getResults, search
    }
})