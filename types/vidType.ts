export type person = {
    character: string,
    known_for_department: string,
    name: string,
    profile_path: string,
    order: number,
    id: number,
    credit_id: number
}

export type MovieTv = {
    title: string,
    name: string,
    release_date: string,
    first_air_date: string,
    vote_average: number,
    poster_path: string,
    genre_ids: number[],
}