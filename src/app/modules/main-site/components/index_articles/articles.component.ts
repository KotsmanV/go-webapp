import { Component, OnInit } from '@angular/core';
import { Article, DocumentTypes } from 'src/app/models/database-models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private firebase:FirebaseService) { }

  articles:Article[] = [];
  length:number = 9;
  isLoaderVisible:boolean = true;

  ngOnInit(): void {
    this.getArticles(this.length);
  }

  getArticles(length:number){
    this.isLoaderVisible = true;
    this.firebase.getDocuments2(DocumentTypes.article,length,`dateReleased`,`desc`).then(resp=>{
      this.articles = resp as Article[];
      this.isLoaderVisible = false;
      
    })
  }

  onMoreButtonClicked(eventData:boolean){
    if(eventData){
      this.length += 9;
      this.getArticles(this.length);
    }
  }
}
