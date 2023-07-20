import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app'
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, limit, orderBy, query, startAfter, startAt, updateDoc } from 'firebase/firestore'

import { environment } from 'src/environments/environment';
import { Article, DocumentTypes, Festival, FluidObj, GameOverDocument, Poster, Presentation, SortingParameter } from '../models/database-models';

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
        response.docs.forEach(d => {
          let presentation:Presentation= d.data() as Presentation;
          presentation.id = d.id;
          presentations.push(presentation);
        })
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
        response.docs.forEach(d => {
          let festival:Festival= d.data() as Festival;
          festival.id = d.id;
          festivals.push(festival);
        })
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
        response.docs.forEach(d => {
          let article:Article= d.data() as Article;
          article.id = d.id;
          articles.push(article);
        });
        return articles;
      })
      .catch(error => {
        console.error(error)
      })
  }

  getPoster(documentId: string, documentType: DocumentTypes) {
    let docRef = doc(this.db, documentType.valueOf(), documentId);
    return getDoc(docRef).then((response) => {
      let poster:Poster;
      if(response.exists()){
        poster = response.data() as Poster;
        poster.id = response.id;
      }else{
        poster = new Poster();
      }
      return poster;
    }).catch(error => {
      console.error(`error retrieving poster`, error);
    })
  }
  getArticle(documentId: string, documentType: DocumentTypes) {
    let docRef = doc(this.db, documentType.valueOf(), documentId);
    return getDoc(docRef).then((response) => {
      let article: Article;
      if(response.exists()){
        article = response.data() as Article;
        article.id = response.id;
      }else{
        article = new Poster();
      }
      return article;
    }).catch(error => {
      console.error(`error retrieving poster`, error);
    })
  }

  getDocument(documentId: string, documentType: DocumentTypes) {
    let docRef = doc(this.db, documentType.valueOf(), documentId);
    return getDoc(docRef).then((response) => {
      let document: Article | Poster | Festival | Presentation | undefined;
      switch (documentType) {
        case DocumentTypes.poster: document = response.data() as Poster; break;
        case DocumentTypes.article: document = response.data() as Article; break;
        case DocumentTypes.festival: document = response.data() as Festival; break;
        case DocumentTypes.presentation: document = response.data() as Presentation; break;
        // case DocumentTypes.magazine: document = response.data() as Magazine; break;
        default: document = undefined; break;
      }
      document!.id = response.id;
      return document;
    }).catch(error => {
      console.error(`error retrieving poster`, error);
      return undefined;
    })
  }

  async addDocument(documentType: DocumentTypes, document: GameOverDocument) {
    try {
      await addDoc(collection(this.db, documentType.valueOf()), Object.assign({}, document));
    } catch (e) {
      console.error(`Document was not added.`, e)
    }
  }

  async updatePoster(documentType: DocumentTypes, document: Poster) {
    let docRef = doc(this.db, documentType.valueOf(), document.id);
    try {
      await updateDoc(docRef, {
        title: document.title,
        text: document.text,
        dateReleased: document.dateReleased,
        dateUpdated: new Date(),
        photoUrl: document.posterUrl
      });
    } catch (e) {
      console.error(`error updating poster`, e);
    }
  }

  async updateArticle(documentType: DocumentTypes, document: Article) {
    let docRef = doc(this.db, documentType.valueOf(), document.id);
    try {
      await updateDoc(docRef, {
        title: document.title,
        text: document.text,
        dateReleased: document.dateReleased,
        dateUpdated: new Date(),
        photoUrl: document.postImageUrl
      });
    } catch (e) {
      console.error(`error updating poster`, e);
    }
  }

  async updateDocument(documentType: DocumentTypes, document: GameOverDocument) {
    let docRef = doc(this.db, documentType.valueOf(), document.id);
    try {
      let updateObj = this.createUpdateDocument(document);
      await updateDoc(docRef, updateObj);
    } catch (e) {
      console.error(`error updating poster`, e);
    }
  }

  createUpdateDocument(sourceDoc: GameOverDocument){
    let targetDoc:FluidObj = {};

    for (const key in sourceDoc) {
      targetDoc[key] = sourceDoc[key as keyof typeof sourceDoc];
    }
    targetDoc['dateUpdated'] = new Date(new Date());
    return targetDoc;
  }

  async getLatestDocuments(){
    let latest:GameOverDocument[] = [];

    let documentTypes = Object.values(DocumentTypes);
    for (let i = 0; i < documentTypes.length; i++){
      let doc = await this.getDocuments(documentTypes[i], 1);
      if(doc){
        latest.push(doc);
      }
    }
    console.log(latest);
    return latest;
  }

  async getDocuments(documentType:DocumentTypes, length:number){
    let documents = query(collection(this.db, documentType), orderBy(`dateUploaded`, `desc`), limit(length), startAfter(`dateUploaded`));
    return await getDocs(documents).then(response=>{
      if(response.docs.length > 0){
        let doc = response.docs[0].data() as GameOverDocument;
        doc.id = response.docs[0].id;
        return doc;
      }
      return;
    });
  }

  
  async getDocuments2(documentType:DocumentTypes, length:number, sortingParameter:SortingParameter, sortingDirection:`asc` | `desc` = `desc`){
    let documents = query(collection(this.db, `${documentType}`), orderBy(sortingParameter, sortingDirection), startAt(sortingParameter), limit(length));
    return await getDocs(documents).then(response=>{
      let documentsArray:GameOverDocument[] = [];
      if(response.docs){
        response.docs.forEach(d=>{
          let doc = d.data() as GameOverDocument;
          doc.id = d.id;
          documentsArray.push(doc);
        });
      }
      return documentsArray;
    });
  }

}
