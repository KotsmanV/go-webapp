import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app'
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { environment } from 'src/environments/environment';
import { Article, DocumentTypes, Festival, Poster, Presentation } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private db!: Firestore;
  appInstance!: FirebaseApp;

  constructor() {
    if (!this.appInstance) {
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.db = getFirestore(getApp())
  }

  getPosters() {
    let posters: Poster[] = [];
    return getDocs(collection(this.db, `posters`))
      .then(response => {
        response.docs.forEach(d => {
          let poster: Poster = d.data() as Poster;
          poster.id = d.id;
          posters.push(poster);
        })
        return posters;
      })
      .catch(error => {
        console.error(error);
      });
  }

  getPresentations() {
    let presentations: Presentation[] = [];
    return getDocs(collection(this.db, `presentations`))
      .then(response => {
        response.docs.forEach(d => presentations.push(d.data() as Presentation))
        return presentations;
      })
      .catch(error => {
        console.error(error)
      })
  }

  getFestivals() {
    let festivals: Festival[] = [];
    return getDocs(collection(this.db, `festivals`))
      .then(response => {
        response.docs.forEach(d => festivals.push(d.data() as Festival))
        return festivals;
      })
      .catch(error => {
        console.error(error)
      })
  }

  getArticles() {
    let articles: Article[] = [];
    return getDocs(collection(this.db, `articles`))
      .then(response => {
        response.docs.forEach(d => articles.push(d.data() as Article))
        return articles;
      })
      .catch(error => {
        console.error(error)
      })
  }

  getPoster(documentId: string, documentType: DocumentTypes) {
    let docRef = doc(this.db, documentType.valueOf(), documentId);
    return getDoc(docRef).then((response) => {
      let poster: Poster = response.data() as Poster;
      poster.id = response.id;
      return poster;
    }).catch(error => {
      console.error(`error retrieving poster`, error);
    })
  }

  async addDocument(documentType: DocumentTypes, document: Poster | Article | Festival | Presentation) {
    try {
      await addDoc(collection(this.db, documentType.valueOf()), Object.assign({}, document));
    } catch (e) {
      console.error(`Poster was not added.`, e)
    }
  }

  async updatePoster(documentType: DocumentTypes, document: Poster) {
    let docRef = doc(this.db, documentType.valueOf(), document.id);
    try{
      await updateDoc(docRef,{
        title: document.title,
        text:document.text,
        dateReleased: document.dateReleased,
        dateUpdated: new Date(),
        photoUrl: document.photoUrl
      });
    }catch(e){
      console.error(`error updating poster`, e);
    }
  }


}
