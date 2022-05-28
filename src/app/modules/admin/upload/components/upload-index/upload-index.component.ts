import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbTabComponent } from '@nebular/theme';
import { Article, DatabaseFolder, Festival, Poster, Presentation } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-upload-index',
  templateUrl: './upload-index.component.html',
  styleUrls: ['./upload-index.component.css']
})
export class UploadIndexComponent implements OnInit {

  posterColumns = [ `title`, `uploadedDt`,`releasedDt`,`image` ];
  articleColumns = [ `title`, `uploadedDt`,`releasedDt`,`image` ];
  presentationColumns = [ `title`, `uploadedDt`,`releasedDt`,`poster`,`cover` ];
  festivalColumns = [ `title`, `uploadedDt`,`releasedDt`,`poster`,`covers`,`photos` ];
  posterUrls!:string[];

  posters:Poster[] | undefined = this.dataStorage.posters;
  articles:Article[] | undefined = this.dataStorage.articles;
  festivals:Festival[] | undefined = this.dataStorage.festivals;
  presentations:Presentation[] | undefined = this.dataStorage.presentations;

  documentTypes = DatabaseFolder;

  posterDatasource!: MatTableDataSource<Poster>;
  articleDatasource!: MatTableDataSource<Article>;
  festivalDatasource!: MatTableDataSource<Festival>;
  presentationDatasource!: MatTableDataSource<Presentation>;
  constructor(private firebase:FirebaseService, private dataStorage:DataStorageService) { }

  ngOnInit(): void {
  }

  getDocuments(event:NbTabComponent){
    switch (event.tabTitle) {
      case DatabaseFolder.posters.valueOf(): this.populatePostersArray(); break;
      case DatabaseFolder.articles.valueOf(): this.populateArticlesArray();break;
      case DatabaseFolder.festivals.valueOf(): this.populateFestivalsArray();break;
      case DatabaseFolder.magazines.valueOf(): this.populateArticlesArray();break;
      case DatabaseFolder.presentations.valueOf(): this.populatePresentationsArray();break;
      default: break;
    }
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  populatePostersArray(){
    if(!this.posters){
      this.firebase.getPosters().then(response =>{
        this.posters = this.dataStorage.posters = response as Poster[];
        this.posterDatasource = new MatTableDataSource<Poster>(this.posters);
      });
    }else{
      this.posterDatasource = new MatTableDataSource<Poster>(this.posters);
    }
  }

  populateArticlesArray(){
    if(!this.articles){
      this.firebase.getArticles().then(response =>{
        this.articles = this.dataStorage.articles = response as Article[];
        this.articleDatasource = new MatTableDataSource<Article>(this.articles)
      })
    }else{
      this.posterDatasource = new MatTableDataSource<Article>(this.articles);
    }
  }

  populateFestivalsArray(){
    if(!this.festivals){
      this.firebase.getFestivals().then(response =>{
        this.festivals= this.dataStorage.festivals= response as Festival[];
        this.festivalDatasource = new MatTableDataSource<Festival>(this.festivals);
      })
    }else{
      this.festivalDatasource = new MatTableDataSource<Festival>(this.festivals);
    }
  }

  populatePresentationsArray(){
    if(!this.festivals){
      this.firebase.getPresentations().then(response =>{
        this.presentations= this.dataStorage.presentations= response as Presentation[];
        this.presentationDatasource = new MatTableDataSource<Presentation>(this.presentations);
      })
    }else{
      this.presentationDatasource = new MatTableDataSource<Presentation>(this.presentations);
    }
  }



  showDate(timestamp:any){
    return new Date(timestamp.seconds * 1000)
  }



}
