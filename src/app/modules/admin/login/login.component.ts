import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({
    username: new FormControl(``,{
      validators:[
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl(``,{
      validators:[
        Validators.required,
        Validators.minLength(8)
      ]
    })
  })

  hasLoggedIn: boolean = false;
  isErrorMessageHidden: boolean = true;
  loginErrors:[] = [];

  constructor(private account:AccountService, private router:Router) { 
    this.account.hasLoggedIn.asObservable().subscribe(value => {
			this.hasLoggedIn = value;
		})
  }
  
  async ngOnInit() {    
    await this.account.auth.onAuthStateChanged(user=>{
      if(user){
        this.router.navigate([`admin`]);  
      }
    });
  }

  async login(){
    this.isErrorMessageHidden = await this.account.signIn(
        this.loginForm.get(`username`)?.value,
        this.loginForm.get(`password`)?.value
      )
  }

  showEmailError(){
    return this.loginForm.get(`username`)?.dirty && this.loginForm.get(`username`)?.invalid;
  }

  showPasswordError(){
    return this.loginForm.get(`password`)?.dirty && this.loginForm.get(`password`)?.invalid;
  }

}
