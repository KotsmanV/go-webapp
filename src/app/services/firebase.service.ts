import { Injectable } from '@angular/core';
import {FirebaseApp, getApp, initializeApp } from 'firebase/app'
import { addDoc, collection, Firestore, getDocs, getFirestore } from 'firebase/firestore'
import { environment } from 'src/environments/environment';
import { Poster } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db!:Firestore;
  appInstance!:FirebaseApp;

  constructor() { 
    if(!this.appInstance){
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.db = getFirestore(getApp())
  }

  getPosters(){
    let posters:Poster[] = [];
    getDocs(collection(this.db,`posters`))
            .then(response => {
              response.docs.forEach(d=>posters.push(d.data() as Poster))
            })
            .catch(error=>{
              console.error(error);
            });
    return posters;
  }

  async addPoster(poster:Poster){
    try{
      await addDoc(collection(this.db,`posters`),poster);
    }catch(e){
      console.error(`Poster was not added.`, e)
    }
  }


}
