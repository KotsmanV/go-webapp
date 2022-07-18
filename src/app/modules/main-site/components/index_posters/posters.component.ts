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

  ngOnInit(): void {
    this.getPosters(9);
  }

  getPosters(length:number){
    this.firebase.getDocuments2(DocumentTypes.poster,length).then(resp=>{
      this.posters = resp as Poster[];
      console.table(this.posters)
    })
  }

}
