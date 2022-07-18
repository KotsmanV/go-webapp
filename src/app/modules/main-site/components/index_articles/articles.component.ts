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

  ngOnInit(): void {
    this.getArticles(9);
  }

  getArticles(length:number){
    this.firebase.getDocuments2(DocumentTypes.article,length).then(resp=>{
      this.articles = resp as Article[];
      console.table(this.articles)
    })
  }
}
