import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  appInstance!:FirebaseApp;
  auth!:Auth;
  user:User | undefined;
  token:string | undefined = undefined;

  constructor(private router:Router) { 
    if(!this.appInstance){
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.auth = getAuth(this.appInstance);
    this.getTokenFromStorage();
  }

  signIn(username:string, password:string){
    signInWithEmailAndPassword(this.auth, username, password).then(credential =>{
      this.user = credential.user;
      this.router.navigate([`admin`]);
    })
    .then(()=>this.user?.getIdToken()).then(res=>{
      this.token = res;
      localStorage.setItem(`token`,JSON.stringify(this.token));
    })
    .catch(error=>{
      console.error(`User sign in error:`, error);
    })
  }

  signOutUser(){
    signOut(this.auth).then(()=>{
      localStorage.clear();
      this.user = undefined;
      this.router.navigate([`admin/login`]);
    });
  }

  getTokenFromStorage(){
    let st = localStorage.getItem(`token`);
    if(st){
      this.token = JSON.parse(st);
    }else{
      this.token = undefined;
    }
  }
}
