import { Injectable } from '@angular/core';
import { Article, Festival, Poster, Presentation } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  posters!:Poster[] | undefined;
  festivals!:Festival[] | undefined;
  articles!:Article[] | undefined;
  // magazines!:Magazine[] | undefined;
  presentations!:Presentation[] | undefined;

  deleteData(){
    this.articles = undefined;
    this.festivals = undefined;
    this.articles = undefined;
    this.presentations = undefined;
    // this.magazines = undefined;
  }
}
