import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentTypes, Poster } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-poster-single',
  templateUrl: './poster-single.component.html',
  styleUrls: ['./poster-single.component.css']
})
export class PosterSingleComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router, dataStorage:DataStorageService, private firebase:FirebaseService) {
    super(router, dataStorage);
   }

   poster!:Poster | undefined;

  ngOnInit(): void {
    this.getPoster();
  }

  getPoster(){
    if(this.dataStorage!.documentId){
      this.firebase.getDocument(this.dataStorage!.documentId, DocumentTypes.poster)?.then(response =>{
        this.poster = response as Poster;
      }).catch(error=>{
        console.error(error);
      })
    }
  }
}
