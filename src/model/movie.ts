
export type Imdb = {
    rating: number,
}

export type TomatoesViewer = {
    rating: number,
}

export type TomatoesInfo = {
    viewer: TomatoesViewer,
}

export type Awards = {
    wins: number,
    nominations: number,
}


export type Movie = {
    _id: string,
    title: string,
    languages?: string[],
    genres: string[],
    imdb: Imdb,
    tomatoes: TomatoesInfo,
    awards: Awards,
    year: number,
    released: Date
}
