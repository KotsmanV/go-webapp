import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, DocumentTypes, Poster, Presentation } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-presentation-single',
  templateUrl: './presentation-single.component.html',
  styleUrls: ['./presentation-single.component.css']
})
export class PresentationSingleComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router, dataStorage:DataStorageService, private firebase:FirebaseService) {
    super(router, dataStorage);
   }

   presentation!:Presentation| undefined;

  ngOnInit(): void {
    this.getPresentation();
  }

  getPresentation(){
    if(this.dataStorage!.documentId){
      this.firebase.getDocument(this.dataStorage!.documentId, DocumentTypes.presentation)?.then(response =>{
        this.presentation = response as Presentation;
      }).catch(error=>{
        console.error(error);
      })
    }
  }

}
