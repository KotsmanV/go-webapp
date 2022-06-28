enum DocumentTypes{
    poster = `posters`,
    article = `articles`,
    presentation = `presentations`,
    festival = `festivals`,
    magazine = `magazines`
}

enum FileBuckets{
    poster = `posters/`,
    article = `articles/`,
    festival = `festivals/`,
    presentation = `presentations/`,
    magazine = `magazines/`,
}

interface Poster{
    id:string;
    title:string,
    text:string,
    photoUrl:string,
    dateUploaded:Date |null,
    dateReleased:Date |null
}

class Poster implements Poster{
    id = ``;
    title = ``;
    text = ``;
    photoUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

interface Presentation{
    id:string;
    title:string,
    text:string,
    posterUrl:string,
    coverUrl:string,
    pdfUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

class Presentation implements Presentation{
    constructor(title:string, text:string, dateReleased:Date | null){
        this.title = title;
        this.text = text;
        this.dateUploaded = new Date();
        this.dateReleased = dateReleased ?? new Date();
    }

    id = ``;
    title = ``;
    text = ``;
    posterUrl = ``;
    coverUrl = ``;
    pdfUrl = ``;
    dateReleased:Date | null = null;
    dateUploaded:Date | null = null;
}

interface Article {
    id:string;
    title:string,
    text:string,
    photoUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null
}

class Article{
    id = ``;
    title = ``;
    text = ``;
    photoUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

interface Festival{
    id:string;
    title:string,
    text:string,
    photoUrls:string[],
    posterUrl:string,
    coverUrls:string[],
    dateReleased:Date | null,
    dateUploaded:Date | null
}

interface FluidObj {
	[key: string]: any
}

type GameOverDocument = Article | Festival | Poster | Presentation;

export { DocumentTypes, FileBuckets, FluidObj, GameOverDocument, Article, Festival, Poster, Presentation }