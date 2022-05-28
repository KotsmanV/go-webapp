import { Injectable } from '@angular/core';
import {FirebaseApp, getApp, initializeApp } from 'firebase/app'
import { addDoc, collection, Firestore, getDocs, getFirestore } from 'firebase/firestore'
import { environment } from 'src/environments/environment';
import { Article, DatabaseFolder, Festival, Poster, Presentation } from '../models/database-models';

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
    return getDocs(collection(this.db,`posters`))
            .then(response => {
              response.docs.forEach(d=>posters.push(d.data() as Poster))
              return posters;
            })
            .catch(error=>{
              console.error(error);
            });
  }

  getPresentations(){
    let presentations:Presentation[] = [];
    return getDocs(collection(this.db, `presentations`))
            .then(response =>{
              response.docs.forEach(d=>presentations.push(d.data() as Presentation))
              return presentations;
            })
            .catch(error =>{
              console.error(error)
            })
  }

  getFestivals(){
    let festivals:Festival[] = [];
    return getDocs(collection(this.db, `festivals`))
            .then(response =>{
              response.docs.forEach(d=>festivals.push(d.data() as Festival))
              return festivals;
            })
            .catch(error =>{
              console.error(error)
            })
  }

  getArticles(){
    let articles:Article[] = [];
    return getDocs(collection(this.db, `articles`))
            .then(response =>{
              response.docs.forEach(d=>articles.push(d.data() as Article))
              return articles;
            })
            .catch(error =>{
              console.error(error)
            })
  }

  async addDocument(documentType:DatabaseFolder, document:Poster | Article | Festival | Presentation){
    try{
      await addDoc(collection(this.db, documentType.valueOf()),Object.assign({}, document));
    }catch(e){
      console.error(`Poster was not added.`, e)
    }
  }


}
