import { Component, Input, OnInit, Output } from '@angular/core';
import { GameOverDocument } from 'src/app/models/database-models';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent implements OnInit {

  constructor() {
  }

  

  @Input() documents:GameOverDocument[] = [];
  @Output() moreButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  getMore(){
    this.moreButton.next(true);
  }

}
