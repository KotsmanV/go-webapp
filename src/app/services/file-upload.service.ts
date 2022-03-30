import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage, listAll, ref, uploadBytes } from 'firebase/storage'
import { environment } from 'src/environments/environment';
import { rootCertificates } from 'tls';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  storage!:FirebaseStorage;
  appInstance!:FirebaseApp;

  constructor() { 
    if(!this.appInstance){
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.storage = getStorage(getApp());
  }

  uploadFile(file:any, filename:string){
    let fileRef = ref(this.storage, filename);
    return uploadBytes(fileRef, file);
  }

  getAllFiles(section:string){
    let files = ref(this.storage,`${section}`);
    
    return listAll(files);

  }
}
