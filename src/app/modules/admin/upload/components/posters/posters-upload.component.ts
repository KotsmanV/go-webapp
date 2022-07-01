import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DocumentTypes, FileBuckets, Poster } from 'src/app/models/database-models';
import { StatusMessage } from 'src/app/models/enums';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalHelper } from 'src/app/services/modal-helper.service';
import { ModalService } from 'src/app/services/modal.service';
import { FileViewModalComponent } from '../file-view-modal/file-view-modal.component';

@Component({
  selector: 'app-posters',
  templateUrl: './posters-upload.component.html',
  styleUrls: ['./posters-upload.component.css']
})
export class PosterUploadComponent implements OnInit, OnDestroy {

  poster!: Poster;
  // poster!: Poster | undefined = new Poster();

  posterForm = new FormGroup({
    title: new FormControl(``,[
      Validators.required,
      Validators.minLength(5)
    ]),
    photoUrl: new FormControl(``),
    dateReleased: new FormControl(),
    text: new FormControl(``)
  },[
    
  ])

  allowedFileTypes = this.fileUpload.allowedFileTypes.image;
  selectedUrl!:string;
  file:any;

  fileArray:File[] = [];

  posterUrls:string[] = [];


  constructor(private firebase:FirebaseService,
              private fileService:FileUploadService,
              private dialogService: NbDialogService,
              private modalService: ModalService,
              private dataStorage:DataStorageService,
              private fileUpload: FileUploadService,
              private modalHelper: ModalHelper,
              private router: Router) { }

  ngOnInit(): void {

    this.getPosterUrls();

    this.modalService.selectedImageUrl.subscribe((selectedUrl)=>{
      this.posterForm.get(`photoUrl`)?.setValue(selectedUrl);
      this.selectedUrl = selectedUrl;
    });

    this.initializePoster();
  }

  ngOnDestroy(): void {
    this.dataStorage.document = undefined;
  }

  initializePoster(){
    if(this.dataStorage.document?.id){
      this.firebase.getPoster(this.dataStorage.document.id, DocumentTypes.poster).then(response=>{
        this.poster = response as Poster;
        this.fillForm(this.poster);
      })
    }
    else{
      this.poster = new Poster();
    }
  }

  fillForm(poster:any){
    this.posterForm.get(`title`)?.setValue(poster.title);
    // this.posterForm.get(`photoUrl`)?.setValue(poster.photoUrl);
    this.selectedUrl = poster.photoUrl;
    this.posterForm.get(`text`)?.setValue(poster.text);
    this.posterForm.get(`dateReleased`)?.setValue(new Date(poster.dateReleased.seconds * 1000));
    this.selectedUrl = poster.photoUrl;
  }

  createPoster(){
    this.poster.title = this.posterForm.get(`title`)?.value;
    this.poster.posterUrl = this.poster.postImageUrl =  this.posterForm.get(`photoUrl`)?.value;
    this.poster.text = this.posterForm.get(`text`)?.value;
    this.poster.dateUploaded = new Date();
    this.poster.dateReleased = this.posterForm.get(`dateReleased`)?.value;
  }

  getFile(eventTarget: any) {
    if (eventTarget.files && eventTarget.files.length > 0) {
      if (eventTarget.files[0].type != "image/jpeg") {
        console.log(`invalid file type`);
        return;
      }
      if (eventTarget.files[0].size > this.fileUpload.fileMaxSize) {
        console.log(`${eventTarget.files[0].size} > ${this.fileUpload.fileMaxSize}`);
        return;
      }

      this.file = eventTarget.files[0];
    } else {
      this.file = undefined;
    }
    console.log(this.file);
  }

  showFile(eventTarget: any) {
    if (eventTarget.files && eventTarget.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedUrl = event.target.result;
      }
      reader.readAsDataURL(eventTarget.files[0]);
    } else {
      this.selectedUrl = this.poster.posterUrl;
    }
  }

  pushFileToArray(eventTarget:any){
    for (const file of eventTarget.files) {
      this.fileArray.push(file)
    }
  }

  validatePoster():boolean{
    if(!this.poster.title) return false;
    if(!this.poster.text) return false;
    return true;
  }

  uploadPoster(){
    if(this.poster.id){
      // this.firebase.updatePoster(DocumentTypes.poster, this.poster).catch(error=>{
      //   console.error(`error updating poster`, error);
      //   this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
      // })
      return this.firebase.updateDocument(DocumentTypes.poster, this.poster);
    }else{
      return this.firebase.addDocument(DocumentTypes.poster, this.poster);
    }    
  }

  async onFormSubmit(){
    if(this.posterForm.valid){
      this.createPoster();

      if(this.file || !this.selectedUrl){
        let filepath = this.fileUpload.formatFileBucketName(FileBuckets.poster, this.poster.title, this.file.name);
        try{
          this.poster.posterUrl = await this.fileUpload.uploadFile(this.file, filepath);
        }catch(e){
          console.error(e);
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
          return;  
        }
      }else{
        this.poster.posterUrl = this.selectedUrl;
      }

      this.uploadPoster().then(()=>{
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.success);
        this.router.navigate([`admin/upload/index`]);
      }).catch(error=>{
        console.error(`error updating poster`, error);
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
      });
      
      // let filepath = this.fileUpload.formatFileBucketName(FileBuckets.poster, this.poster.title, this.file.name);
      // this.fileUpload.uploadFile(this.file, filepath)
      // .then(imageUrl =>{
      //   this.poster.photoUrl = imageUrl;
      // }).then(()=>{
      //   this.uploadPoster();
      // }).then(()=>{
      //   this.modalHelper.openMessageModal(this.dialogService, StatusMessage.success);
      //   this.router.navigate([`admin/upload/index`]);
      // }).catch(error=>{
      //   this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
      //   console.log(error);
      // });
    }else{
      this.modalHelper.openMessageModal(this.dialogService,StatusMessage.validationError);
    };
  }

  getPosterUrls(){
    this.fileService.getAllFileUrls(`posters`).subscribe({
      next: resp =>{
        this.posterUrls = resp;
      },
      error: error =>{
        console.error(error);
      }
    })
  }

  openFileDisplayModal(event:any){
    event.preventDefault();
    this.dialogService.open(FileViewModalComponent,{
      context: {
        urls: this.posterUrls
      }
    })    
  }
    
    // openFileDisplayModal = this.htmlHelpers.openFileDisplayModal;
    
  //   then(urls=>{
  //     console.table(urls);      
  //     if(Array.isArray(urls)){
  //       this.posterUrls = urls;        
  //     }
  //   })
  // }
}
