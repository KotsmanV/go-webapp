import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NbTabComponent } from '@nebular/theme';
import { Article, DocumentTypes, Festival, Poster, Presentation } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-upload-index',
  templateUrl: './upload-index.component.html',
  styleUrls: ['./upload-index.component.css']
})
export class UploadIndexComponent implements OnInit {
  constructor(private firebase: FirebaseService,
    private dataStorage: DataStorageService,
    private router: Router) { }

  posterColumns = [`title`, `uploadedDt`, `releasedDt`, `image`];
  articleColumns = [`title`, `uploadedDt`, `releasedDt`, `image`];
  presentationColumns = [`title`, `uploadedDt`, `releasedDt`, `poster`, `cover`];
  festivalColumns = [`title`, `uploadedDt`, `releasedDt`, `poster`, `covers`, `photos`];
  posterUrls!: string[];

  posters!: Poster[] | undefined;
  articles!: Article[] | undefined;
  festivals!: Festival[] | undefined;
  presentations!: Presentation[] | undefined;
  // posters: Poster[] | undefined = this.dataStorage.posters;
  // articles: Article[] | undefined = this.dataStorage.articles;
  // festivals: Festival[] | undefined = this.dataStorage.festivals;
  // presentations: Presentation[] | undefined = this.dataStorage.presentations;

  documentTypes = DocumentTypes;

  posterDatasource!: MatTableDataSource<Poster>;
  articleDatasource!: MatTableDataSource<Article>;
  festivalDatasource!: MatTableDataSource<Festival>;
  presentationDatasource!: MatTableDataSource<Presentation>;

  ngOnInit(): void {
  }

  getDocuments(event: NbTabComponent) {
    switch (event.tabTitle) {
      case DocumentTypes.poster.valueOf(): this.populatePostersArray(); break;
      case DocumentTypes.article.valueOf(): this.populateArticlesArray(); break;
      case DocumentTypes.festival.valueOf(): this.populateFestivalsArray(); break;
      case DocumentTypes.magazine.valueOf(): this.populateArticlesArray(); break;
      case DocumentTypes.presentation.valueOf(): this.populatePresentationsArray(); break;
      default: break;
    }
  }

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

  populatePostersArray() {
    if (!this.posters) {
      this.firebase.getPosters().then(response => {
        this.posters = this.dataStorage.posters = response as Poster[];
        console.table(response);
        this.posterDatasource = new MatTableDataSource<Poster>(this.posters);
      });
    } else {
      this.posterDatasource = new MatTableDataSource<Poster>(this.posters);
    }
  }

  populateArticlesArray() {
    if (!this.articles) {
      this.firebase.getArticles().then(response => {
        this.articles = this.dataStorage.articles = response as Article[];
        this.articleDatasource = new MatTableDataSource<Article>(this.articles);
      })
    } else {
      this.articleDatasource = new MatTableDataSource<Article>(this.articles);
    }
  }

  populateFestivalsArray() {
    if (!this.festivals) {
      this.firebase.getFestivals().then(response => {
        this.festivals = this.dataStorage.festivals = response as Festival[];
        this.festivalDatasource = new MatTableDataSource<Festival>(this.festivals);
      })
    } else {
      this.festivalDatasource = new MatTableDataSource<Festival>(this.festivals);
    }
  }

  populatePresentationsArray() {
    if (!this.festivals) {
      this.firebase.getPresentations().then(response => {
        this.presentations = this.dataStorage.presentations = response as Presentation[];
        this.presentationDatasource = new MatTableDataSource<Presentation>(this.presentations);
      })
    } else {
      this.presentationDatasource = new MatTableDataSource<Presentation>(this.presentations);
    }
  }

  showDate(timestamp: any) {
    return new Date(timestamp?.seconds * 1000);
  }

  showDetails(documentType: DocumentTypes, document: Poster | Article | Festival | Presentation) {
    this.dataStorage.document = document;
    this.dataStorage.documentId = document.id;
    console.log(document);
    let routerLink: string;
    switch (documentType) {
      case DocumentTypes.poster.valueOf(): routerLink = `admin/upload/poster`; break;
      case DocumentTypes.article.valueOf(): routerLink = `admin/upload/article`; break;
      case DocumentTypes.festival.valueOf(): routerLink = `admin/upload/festival`; break;
      case DocumentTypes.magazine.valueOf(): routerLink = `admin/upload/magazine`; break;
      case DocumentTypes.presentation.valueOf(): routerLink = `admin/upload/presentation`; break;
      default: routerLink = `upload/index`; break;
    }
    this.router.navigate([routerLink])
  }

}
