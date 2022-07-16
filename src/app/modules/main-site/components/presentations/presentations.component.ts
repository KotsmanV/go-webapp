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

  ngOnInit(): void {
    this.getPresentations(10);
  }

  getPresentations(length:number){
    this.firebase.getDocuments2(DocumentTypes.presentation,length).then(resp=>{
      this.presentations = resp as Presentation[];
      console.table(this.presentations)
    })
  }

}
