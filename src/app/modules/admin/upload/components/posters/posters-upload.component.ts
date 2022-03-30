import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Poster } from 'src/app/models/database-models';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters-upload.component.html',
  styleUrls: ['./posters-upload.component.css']
})
export class PosterUploadComponent implements OnInit {

  poster: Poster = {
    title:``,
    text:``,
    photoUrl:``
  }

  posterForm = new FormGroup({
    title: new FormControl(``,[
      Validators.required,
      Validators.minLength(5)
    ]),
    poster: new FormControl(null),
    text: new FormControl(``)
  },[
    
  ])

  fileArray:File[] = [];


  constructor(private firebase:FirebaseService, private fileUpload:FileUploadService) { }

  ngOnInit(): void {
  }

  createPoster(){
    this.poster.title = this.posterForm.get(`title`)?.value;
    this.poster.text = this.posterForm.get(`text`)?.value;
  }

  pushFileToArray(eventTarget:any){
    for (const file of eventTarget.files) {
      this.fileArray.push(file)
    }
  }

  uploadFiles(){
    for (const file of this.fileArray) {
      this.fileUpload.uploadFile(file, file.name);
    }
    this.fileUpload
  }

  validatePoster():boolean{
    if(!this.poster.title) return false;
    if(!this.poster.text) return false;
    return true;
  }

  uploadPoster(){
    this.firebase.addPoster(this.poster)
      .catch(error=>{
        console.error(error);
      });
  }

  onFormSubmit(){
    this.createPoster();
    console.log(this.posterForm.valid);
    if(this.posterForm.valid){
      console.log(`uploaded`);
      this.uploadPoster();
    }else{
      console.log(`form errors!`);
    };

  }
}
