import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  constructor(private accountService:AccountService) { 
    this.accountService.signInAnonymous()
  }

  ngOnInit(): void {
    
  }

}
