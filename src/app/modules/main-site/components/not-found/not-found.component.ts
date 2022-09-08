import { Component, Input, OnInit } from '@angular/core';
import {Location } from '@angular/common'

@Component({
  selector: 'app-not-found[replacedDocument]',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  constructor(private location:Location) { }

  @Input() replacedDocument!:`article` | `poster` | `festival` | `presentation`;

  ngOnInit(): void {
  }

  displayMissingElement(){
    switch (this.replacedDocument) {
      case `article`: return `Το άρθρο`;
      case `poster`: return `Η αφίσα`;
      case `presentation`: return `Η εισήγηση`;
      case `festival`: return `Το φεστιβάλ`;
      default: return `Η σελίδα`
    }
  }

  goBack(){
    this.location.back()
  }

}
