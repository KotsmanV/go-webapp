import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, DocumentTypes, Poster } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.css']
})
export class ArticleSingleComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router, dataStorage:DataStorageService, private firebase:FirebaseService) {
    super(router, dataStorage);
   }

   article!:Article| undefined;

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle(){
    if(this.dataStorage!.documentId){
      this.firebase.getDocument(this.dataStorage!.documentId, DocumentTypes.article)?.then(response =>{
        this.article = response as Poster;
      }).catch(error=>{
        console.error(error);
      })
    }
  }

}
