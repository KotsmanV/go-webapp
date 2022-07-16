import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentTypes, GameOverDocument } from 'src/app/models/database-models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CommonComponentFunctionality } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router) {
    super(router);
  }

  @Input() documents:GameOverDocument[] = [];

  ngOnInit(): void {
  }



}
