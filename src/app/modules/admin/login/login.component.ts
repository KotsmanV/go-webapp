import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    username: new FormControl(``),
    password: new FormControl(``)
  })
  constructor(private account:AccountService, private router:Router) { }

  ngOnInit(): void {
    if(this.account.user){
      this.router.navigate([`admin`]);
    }
  }

  login(){
    this.account.signIn(
      this.loginForm.get(`username`)?.value,
      this.loginForm.get(`password`)?.value
    )
  }

}
