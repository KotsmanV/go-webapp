export enum DocumentTypes{
    poster = `posters`,
    article = `articles`,
    presentation = `presentations`,
    festival = `festivals`,
    magazine = `magazines`
}

export enum FileBuckets{
    poster = `posters/`,
    article = `articles/`,
    festival = `festivals/`,
    presentation = `presentations/`,
    magazine = `magazines/`,
}

export interface Poster{
    id:string;
    title:string,
    text:string,
    photoUrl:string,
    dateUploaded:Date |null,
    dateReleased:Date |null
}

export class Poster implements Poster{
    id = ``;
    title = ``;
    text = ``;
    photoUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

export interface Presentation{
    id:string;
    title:string,
    text:string,
    posterUrl:string,
    coverUrl:string,
    pdfUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

export interface Article {
    id:string;
    title:string,
    text:string,
    photoUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

export class Article{
    id = ``;
    title = ``;
    text = ``;
    photoUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

export interface Festival{
    id:string;
    title:string,
    text:string,
    photoUrls:string[],
    posterUrl:string,
    coverUrls:string[],
    dateReleased:Date | null,
    dateUploaded:Date | null
}