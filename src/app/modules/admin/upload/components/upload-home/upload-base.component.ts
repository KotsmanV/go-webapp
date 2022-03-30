import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-home',
  templateUrl: './upload-base.component.html',
  styleUrls: ['./upload-base.component.css']
})
export class UploadBaseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tabs:any[]=[
    {
      title: `αφισες`,
      route: `posters`
    },
    {
      title: `φεστιβαλ`,
      route: `festivals`
    },
    {
      title: `κειμενα`,
      route: `texts`
    },
    {
      title: `περιοδικα`,
      route: `magazines`
    },
  ]
}
