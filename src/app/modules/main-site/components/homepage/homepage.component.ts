import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navigateTo } from '../../helpers/navigation-helpers';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  navigateTo = (link:string) => navigateTo(link, this.router);
}
