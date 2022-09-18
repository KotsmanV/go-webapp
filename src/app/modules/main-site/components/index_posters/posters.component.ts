import { Component, OnInit } from '@angular/core';
import { DocumentTypes, Poster } from 'src/app/models/database-models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css']
})
export class PostersComponent implements OnInit {

  constructor(private firebase:FirebaseService) { }

  posters:Poster[] = [];
  length:number = 9;
  isLoaderVisible:boolean = false;

  ngOnInit(): void {
    this.getPosters(this.length);
  }

  getPosters(length:number){
    this.isLoaderVisible = true;
    this.firebase.getDocuments2(DocumentTypes.poster,length, `dateReleased`,`desc`).then(resp=>{
      this.posters = resp as Poster[];
      this.isLoaderVisible = false;
    })
  }

  onMoreButtonClicked(eventData:boolean){
    if(eventData){
      this.length += 9;
      this.getPosters(this.length);
    }
  }

}
