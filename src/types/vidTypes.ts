export interface Genres {
    id: number,
    name: string
}

export interface MoviesTVCardType {
    id: number,
    media_type?: MovieTV,
    poster_path: string,
    vote_average: number,
    original_title?: string,
    original_name?: string,
    genre_ids?: number[],
    release_date?: string,
    first_air_date?: string,
    popularity: number
}

export interface personCardType {
    character: string,
    profile_path: string,
    name: string
}

export interface videosCardType {
    key: string,
    name: string,
}

export type MovieTV = 'movie' | 'tv'

export type PopularTopRated = 'popular' | 'top_rated'

export interface Crew {
    name: string,
    job: string
}

export interface DetailType extends MoviesTVCardType {
    genres: Genres[],
    backdrop_path: string,
    tagline: string,
    overview: string,
    status: string,
    runtime?: number,
    created_by?: { name: string }[]
}