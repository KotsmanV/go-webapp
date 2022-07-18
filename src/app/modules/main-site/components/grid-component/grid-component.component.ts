import { Component, Input, OnInit } from '@angular/core';
import { GameOverDocument } from 'src/app/models/database-models';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent implements OnInit {

  constructor() {
  }

  @Input() documents:GameOverDocument[] = [];

  ngOnInit(): void {
  }



}
