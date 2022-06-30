import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonComponentFunctionality, navigateTo } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends CommonComponentFunctionality implements OnInit {

  constructor(router:Router) { 
    super(router)
  }

  ngOnInit(): void {
  }
}
