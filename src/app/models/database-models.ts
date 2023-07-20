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
    synopsis:string,
    posterUrl:string,
    postImageUrl:string,
    dateUploaded:Date |null,
    dateReleased:Date |null,
    type:string
}

class Poster implements Poster{
    id = ``;
    title = ``;
    text = ``;
    synopsis = ``;
    posterUrl = ``;
    postImageUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

interface Presentation{
    id:string;
    title:string,
    text:string,
    synopsis:string,
    postImageUrl:string,
    posterUrl:string,
    coverUrl:string,
    pdfUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null,
    type:string
}

class Presentation implements Presentation{
    constructor(){
        this.dateUploaded = new Date();
        this.type = `presentations`;
    }

    id = ``;
    title = ``;
    text = ``;
    synopsis = ``;
    postImageUrl = ``;
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
    synopsis:string,
    postImageUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null,
    type:string
}

class Article{
    id = ``;
    title = ``;
    text = ``;
    synopsis = ``;
    postImageUrl = ``;
    dateUploaded: Date | null = null;
    dateReleased:Date | null = null;
}

interface Festival{
    id:string;
    title:string,
    text:string,
    synopsis:string,
    postImageUrl:string,
    photoUrls:string[],
    posterUrl:string,
    coverUrls:string[],
    dateReleased:Date | null,
    dateUploaded:Date | null,
    type:string
}

interface Magazine{
    id:string;
    title:string;
    text:string;
    synopsis:string;
    postImageUrl:string;
    pdfUrl:string,
    dateReleased:Date | null,
    dateUploaded:Date | null,
    type:string
}

class Magazine implements Magazine{
    constructor(){
        this.dateUploaded = new Date();
        this.type = `magazines`;
    }

    id = ``;
    title = ``;
    text = ``;
    synopsis = ``;
    postImageUrl = ``;
    pdfUrl = ``;
    dateReleased:Date | null = null;
    dateUploaded:Date | null = null;
    type:string
}

interface FluidObj {
	[key: string]: any
}

type GameOverDocument = Article | Festival | Poster | Presentation | Magazine;
type SortingParameter = `title` | `dateReleased` | `dateUploaded` | `dateUpdated`;

export { 
    DocumentTypes, 
    GameOverDocument, 
    SortingParameter,
    FileBuckets, 
    FluidObj, 
    Article, 
    Festival, 
    Poster, 
    Presentation,
    Magazine
}