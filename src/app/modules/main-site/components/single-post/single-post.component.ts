import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOverDocument } from 'src/app/models/database-models';
import { CommonComponentFunctionality } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router) {
    super(router);
  }

  @Input() document!:GameOverDocument

  ngOnInit(): void {
  }

}
