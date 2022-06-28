import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private account:AccountService) { }

  ngOnInit(): void {
  }

  logout(){
    this.account.signOutUser();
  }
  menuItems: NbMenuItem[] = [
    {
      title: `dashboard`,
      link: `/admin`,
      home: true,
      icon: `home-outline`
    },
    {
      title: `upload`,
      link: `upload/index`,
      expanded: false,
      icon: `edit-2-outline`,
      children: [
        {
          title: `index`,
          link: `upload/index`
        },
        {
          title: `posters`,
          link: `upload/poster`
        },
        {
          title: `presentations`,
          link: `upload/presentation`
        },
        {
          title: `festivals`,
          link: `upload/festival`
        },
        {
          title: `articles`,
          link: `upload/article`
        },
        {
          title: `texts`,
          link: `upload/text`
        },
        {
          title: `magazines`,
          link: `upload/magazine`
        },
      ]

    },
    // {
    //   title: `statistics`,
    //   link: `statistics`,
    //   icon: `pie-chart-outline`
    // },
    // {
    //   title:`publications`,
    //   link:`publications`,
    //   icon:`book`
    // },
    // {
    //   title: `users`,
    //   link: `users`,
    //   icon: `lock-outline`
    // },
    {
      title:`logout`,
      icon:`key-outline`
    }
  ]


}
