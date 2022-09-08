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

  showMenu:boolean = false;

  ngOnInit(): void {
  }

  showMenuOnClick(menuElement:HTMLDivElement, crosses:HTMLDivElement){
    this.showMenu = !this.showMenu;
    if(this.showMenu){
      menuElement.classList.add(`show-element`);
      crosses.classList.add(`crosses-right`);
    }else{
      menuElement.classList.remove(`show-element`);
      crosses.classList.remove(`crosses-right`);
    }
  }
}
