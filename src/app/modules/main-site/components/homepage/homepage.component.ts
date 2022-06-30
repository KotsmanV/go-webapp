import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOverDocument } from 'src/app/models/database-models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality, navigateTo } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent extends CommonComponentFunctionality implements OnInit {

  latestPosts: GameOverDocument[] = [];
  constructor(router:Router, private firebase:FirebaseService) { 
    super(router);
  }

  ngOnInit(): void {
    this.populateLatestPosts();
  }

  async populateLatestPosts(){
    this.latestPosts = await this.firebase.getLatestDocuments();
    console.table(this.latestPosts);
  }
  // navigateTo = (link:string) => navigateTo(link, this.router);
}
