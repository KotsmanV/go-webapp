import { Component, OnInit } from '@angular/core';
import { DocumentTypes, Presentation } from 'src/app/models/database-models';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  constructor(private firebase:FirebaseService) { }

  presentations:Presentation[] = [];
  length:number = 9;
  isLoaderVisible:boolean = true;

  ngOnInit(): void {
    this.getPresentations(this.length);
  }

  getPresentations(length:number){
    this.isLoaderVisible = true;
    this.firebase.getDocuments2(DocumentTypes.presentation,length,`dateReleased`,`desc`).then(resp=>{
      this.presentations = resp as Presentation[];
      this.isLoaderVisible = false;
    })
  }

  onMoreButtonClicked(eventData:boolean){
    if(eventData){
      this.length += 9;
      this.getPresentations(this.length);
    }
  }

}
