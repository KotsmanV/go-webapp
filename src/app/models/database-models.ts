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