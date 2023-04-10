import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  appInstance!: FirebaseApp;
  auth!: Auth;
  user!: User | null;
  token: string | undefined = undefined;
  hasLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) {
    if (!this.appInstance) {
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.auth = getAuth(this.appInstance);
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
    this.user ? this.hasLoggedIn.next(true) : this.hasLoggedIn.next(false);
  }

  async signIn(username: string, password: string) {
    await this.auth.setPersistence(browserLocalPersistence);
    return signInWithEmailAndPassword(this.auth, username, password).then(credential => {
      this.user = credential.user;
      this.hasLoggedIn.next(true);
      this.router.navigate([`admin`]);
      return true;
    }).catch(error => {
      console.error(error);
      return false;
    })
  }

  async signInAnonymous() {
    await this.auth.setPersistence(browserLocalPersistence).then(async ()=>{
      await signInAnonymously(this.auth).then(()=> {
        this.hasLoggedIn.next(true);
        return true;
      }).catch(error => {
        console.error(error);
        this.hasLoggedIn.next(false);
        return false;
      })

    })
  }

  signOutUser() {
    signOut(this.auth).then(() => {
      localStorage.clear();
      this.user = null;
      this.router.navigate([`admin/login`]);
      this.hasLoggedIn.next(false);
    });
  }

  getTokenFromStorage() {
    let st = sessionStorage.getItem(`token`);
    if (st) {
      this.token = JSON.parse(st);
    } else {
      this.token = undefined;
    }
  }
}
