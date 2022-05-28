import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/homepage/navbar-models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuItems:MenuItem[] = [
    {
      text: `Αρχική`,
      link: ``,
      type: `link`
    },
    {
      text: `Αφίσες`,
      link: `posters`,
      type: `link`
    },
    {
      text: `Φεστιβάλ`,
      link: `festivals`,
      type: `link`
    },
    {
      text: `Εκδηλώσεις`,
      link: `presentations`,
      type: `link`
    },
    


    
  ];

}
