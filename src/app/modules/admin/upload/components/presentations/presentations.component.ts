import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { retry } from 'rxjs';
import { DocumentTypes, FileBuckets, Presentation } from 'src/app/models/database-models';
import { StatusMessage } from 'src/app/models/enums';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalHelper } from 'src/app/services/modal-helper.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css']
})
export class PresentationsComponent implements OnInit {

  constructor(private fileUpload: FileUploadService,
    private firebase: FirebaseService,
    private dataStorage: DataStorageService,
    private dialogService: NbDialogService,
    private modalHelper: ModalHelper,
    private router: Router) { }

  presentation!: Presentation;
  allowedImageTypes = this.fileUpload.allowedFileTypes.image;
  allowedDocumentTypes = this.fileUpload.allowedFileTypes.pdf;

  filesToUpload = {
    poster!: new File(),
    cover!: {},
    pdf!: {},
  }

  urls = {
    cover: ``,
    poster: ``,
    pdf: ``
  }

  selectedCoverUrl!: string;
  selectedPosterUrl!: string;
  selectedPdfUrl!: string;

  posterFile: any;
  coverFile: any;
  pdfFile: any;

  presentationForm = new FormGroup({
    title: new FormControl(``, [
      Validators.required,
      Validators.minLength(5)
    ]),
    poster: new FormControl(``),
    cover: new FormControl(``),
    pdf: new FormControl(``),
    dateReleased: new FormControl(new Date()),
    text: new FormControl(``)
  })

  ngOnInit(): void {
    this.initializePresentation();
  }

  ngOnDestroy(): void {
    this.dataStorage.document = undefined;
  }

  initializePresentation() {
    if (this.dataStorage.document?.id) {
      this.firebase.getDocument(this.dataStorage.document.id, DocumentTypes.presentation).then(response => {
        this.presentation = response as Presentation;
        this.fillForm(this.presentation);
      }).catch(error => {
        console.error(error);
      })
    }
    else {
      this.presentation = new Presentation(``,``,new Date());
    }
  }

  fillForm(presentation: Presentation) {
    this.presentationForm.get(`title`)?.setValue(presentation.title);
    this.presentationForm.get(`text`)?.setValue(presentation.text);
    this.presentationForm.get(`dateReleased`)?.setValue(presentation.text);
    this.urls.poster = presentation.posterUrl;
    this.urls.cover = presentation.coverUrl;
    this.urls.pdf = presentation.pdfUrl;
  }

  getFile(eventTarget: any, type: string) {
    if (eventTarget.files && eventTarget.files.length > 0) {
      if ((type != `pdf` && eventTarget.files[0].type != `image/jpg`) || (type == `pdf` && eventTarget.files[0].type != `application/pdf`)) {
        console.log(`invalid file type`);
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.invalidFileError);
        return;
      }
      if (type != `pdf` && eventTarget.files[0].size > this.fileUpload.fileMaxSize) {
        console.log(`${eventTarget.files[0].size} > ${this.fileUpload.fileMaxSize}`);
        return;
      }
      if (type == `pdf`) {
        this.filesToUpload.pdf = eventTarget.files[0];
        return;
      }
      if (type == `poster`) {
        this.filesToUpload.poster = eventTarget.files[0];
        return;
      }
      if (type == `cover`) {
        this.filesToUpload.cover = eventTarget.files[0];
        return;
      }
    }
    // else {
    //   if (type == `pdf`) {
    //     this.filesToUpload.pdf = undefined;
    //     return;
    //   }
    //   if (type == `poster`) {
    //     this.filesToUpload.poster = undefined;
    //     return;
    //   }
    //   if (type == `cover`) {
    //     this.filesToUpload.cover = undefined;
    //     return;
    //   }
    // }
  }

  showFile(eventTarget: any, type: string) {
    if (eventTarget.files && eventTarget.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (type == `poster`) {
          this.urls.poster = event.target.result;
        } else if (type == `cover`) {
          this.urls.cover = event.target.result;
        } else if (type = `pdf`) {
          this.urls.pdf = event.targer.result;
        }
      }
      reader.readAsDataURL(eventTarget.files[0]);
    } else {
      if (type == `poster`) {
        this.urls.poster = this.presentation.posterUrl;
      } else if (type == `cover`) {
        this.urls.cover = this.presentation.coverUrl;
      } else if (type = `pdf`) {
        this.urls.pdf = this.presentation.pdfUrl;
      }
    }
  }

  createPresentation() {
    this.presentation = new Presentation(
      this.presentationForm.get(`title`)?.value,
      this.presentationForm.get(`text`)?.value,
      this.presentationForm.get(`dateReleased`)?.value
    );
  }

  uploadFiles(){
    let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, this.filesToUpload.cover?.name);





    let urls:string[] = [];
    let files:any[] = [
      this.posterFile,
      this.coverFile,
      this.pdfFile
    ];

    for (let i = 0; i < files.length; i++) {
      let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, files[i].name);
      return this.fileUpload.uploadFile(files[i], filepath).then(url=>{
        urls.push(url);
      }).catch(error=>{
        console.error(error);
        this.modalHelper.openMessageModal(this.dialogService,`${StatusMessage.fileUploadError} ${files[i].name}`);
        return undefined;
      });

    }


    files.forEach(file=>{
      let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, file.name);
      this.fileUpload.uploadFile(file, filepath).then(url=>{
        urls.push(url);
      }).catch(error=>{
        console.error(error);
        this.modalHelper.openMessageModal(this.dialogService,`${StatusMessage.fileUploadError} ${file.name}`);
      });
    })
  }

  uploadFile(file:any){
    let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, file.name);
    return this.fileUpload.uploadFile(file, filepath).then(url=>{
            return url;
          }).catch(error=>{
            console.error(error);
            this.modalHelper.openMessageModal(this.dialogService,`${StatusMessage.fileUploadError} ${file.name}`);
            return undefined;
          });
  }

  onFormSubmit() {
    if (this.presentationForm.valid) {
      this.createPresentation();
      


      




    }
  }
}
