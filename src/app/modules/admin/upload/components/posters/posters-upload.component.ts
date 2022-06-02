import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogConfig, NbDialogService } from '@nebular/theme';
import { DocumentTypes, Poster } from 'src/app/models/database-models';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalService } from 'src/app/services/modal.service';
import { FileViewModalComponent } from '../file-view-modal/file-view-modal.component';

@Component({
  selector: 'app-posters',
  templateUrl: './posters-upload.component.html',
  styleUrls: ['./posters-upload.component.css']
})
export class PosterUploadComponent implements OnInit {

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

  fileArray:File[] = [];

  posterUrls:string[] = [];
  selectedUrl!:string;


  constructor(private firebase:FirebaseService,
              private fileService:FileUploadService,
              private dialogService: NbDialogService,
              private modalService: ModalService,
              private dataStorage:DataStorageService,
              private router: Router) { }

  ngOnInit(): void {

    this.getPosterUrls();

    this.modalService.selectedImageUrl.subscribe((selectedUrl)=>{
      this.posterForm.get(`photoUrl`)?.setValue(selectedUrl);
      this.selectedUrl = selectedUrl;
    });

    this.initializePoster();
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
    this.posterForm.get(`photoUrl`)?.setValue(poster.photoUrl);
    this.posterForm.get(`text`)?.setValue(poster.text);
    this.posterForm.get(`dateReleased`)?.setValue(new Date(poster.dateReleased.seconds * 1000));
    this.selectedUrl = poster.photoUrl;
  }

  createPoster(){
    this.poster.title = this.posterForm.get(`title`)?.value;
    this.poster.photoUrl = this.posterForm.get(`photoUrl`)?.value;
    this.poster.text = this.posterForm.get(`text`)?.value;
    this.poster.dateUploaded = new Date(2022,1,1);
    this.poster.dateReleased = this.posterForm.get(`dateReleased`)?.value;
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
      this.firebase.updatePoster(DocumentTypes.poster, this.poster).catch(error=>{
        console.error(`error updating poster`, error);
      })
    }else{
      this.firebase.addDocument(DocumentTypes.poster, this.poster)
      .catch(error=>{
        console.error(error);
      });
    }    
  }

  onFormSubmit(){
    this.createPoster();
    if(this.posterForm.valid){
      this.uploadPoster();
      this.router.navigate([`admin/upload/index`])
    }else{
      console.error(`form errors!`);
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
    
    
  //   then(urls=>{
  //     console.table(urls);      
  //     if(Array.isArray(urls)){
  //       this.posterUrls = urls;        
  //     }
  //   })
  // }
}
