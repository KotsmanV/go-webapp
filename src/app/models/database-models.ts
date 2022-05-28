export enum DatabaseFolder{
    posters = `posters`,
    articles = `articles`,
    presentations = `presentations`,
    festivals = `festivals`,
    magazines = `magazines`
}

export interface Poster{
    title:string,
    text:string,
    photoUrl:string,
    dateUploaded:Date |null,
    dateReleased:Date |null
}

export class Poster implements Poster{
    title = ``;
    text = ``;
    photoUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

export interface Presentation{
    title:string,
    text:string,
    posterUrl:string,
    coverUrl:string,
    pdfUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

export interface Article {
    title:string,
    text:string,
    photoUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

export interface Festival{
    title:string,
    text:string,
    photoUrls:string[],
    posterUrl:string,
    coverUrls:string[],
    dateReleased:Date | null,
    dateUploaded:Date | null
}