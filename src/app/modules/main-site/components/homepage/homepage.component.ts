import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOverDocument } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality, navigateTo } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent extends CommonComponentFunctionality implements OnInit {

  isLoaderVisible:boolean = true;
  latestPosts: GameOverDocument[] = [];

  constructor(router:Router, private firebase:FirebaseService, private storageService:DataStorageService) { 
    super(router);
  }

  ngOnInit(): void {
    this.populateLatestPosts();
  }

  async populateLatestPosts(){
    this.isLoaderVisible = true;
    if(this.storageService.latestDocuments.length == 0){
      this.latestPosts = this.storageService.latestDocuments = await this.firebase.getLatestDocuments();
    }else{
      this.latestPosts = this.storageService.latestDocuments;
    }
    this.isLoaderVisible = false;
  }


  


}
