import { Injectable } from '@angular/core';
import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { arrayRemove } from 'firebase/firestore';
import { FirebaseStorage, getDownloadURL, getStorage, listAll, ref, StorageReference, uploadBytes } from 'firebase/storage'
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { rootCertificates } from 'tls';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  storage!: FirebaseStorage;
  appInstance!: FirebaseApp;

  constructor() {
    if (!this.appInstance) {
      initializeApp(environment.firebaseConfig);
      this.appInstance = getApp();
    }
    this.storage = getStorage(getApp());
  }

  uploadFile(file: any, filename: string) {
    let fileRef = ref(this.storage, filename);
    return uploadBytes(fileRef, file);
  }

  getAllFiles(section: string) {
    let downloadUrls: string[] = [];
    let files = ref(this.storage, `${section}`);

    listAll(files).then(resp => {
      resp.items.forEach(item => {
        getDownloadURL(ref(this.storage, item.fullPath)).then(url => {
          downloadUrls.push(url);
        });

      });
    }).catch(error => {
      console.error(`firebase get all files`, error);
    })
    return downloadUrls;

  }

  getAllFileUrls(section: string) {
    return from(listAll(ref(this.storage, `${section}`)).then((resp) => {
      let paths: string[] = [];
      resp.items.forEach(i => {
        paths.push(i.fullPath);
      })
      return paths;
    }).then(paths => {
      let urls: string[] = [];
      paths.forEach(p => getDownloadURL(ref(this.storage, p)).then(url => {
        urls.push(url);
      }))
      return urls;
    }).catch(error=>{
      console.error(`Error retrieving files`, error);
      return new Array<string>();
    }));
  }




  getFileUrl(path: string,) {

  }
}
