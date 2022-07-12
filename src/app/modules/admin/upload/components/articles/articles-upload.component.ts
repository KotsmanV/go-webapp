import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Article, DocumentTypes, FileBuckets } from 'src/app/models/database-models';
import { StatusMessage } from 'src/app/models/enums';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalHelper } from 'src/app/services/modal-helper.service';
import { InfoMessageModalComponent } from '../modals/info-message-modal/info-message-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles-upload.component.html',
  styleUrls: ['./articles-upload.component.css']
})
export class ArticleUploadComponent implements OnInit, OnDestroy {
  constructor(private fileUpload: FileUploadService,
    private firebase: FirebaseService,
    private dataStorage: DataStorageService,
    private dialogService: NbDialogService,
    private modalHelper: ModalHelper,
    private router: Router) { }

  article!: Article;
  allowedFileTypes = this.fileUpload.allowedFileTypes.image;
  selectedUrl!: string;
  file: any;

  articleForm = new FormGroup({
    title: new FormControl(``, [
      Validators.required,
      Validators.minLength(5)
    ]),
    image: new FormControl(``),
    dateReleased: new FormControl(new Date()),
    text: new FormControl(``)
  })

  ngOnInit(): void {
    if (this.dataStorage.document?.id) {
      this.firebase.getDocument(this.dataStorage.document.id, DocumentTypes.article).then(response => {
        this.article = response as Article;
        this.fillForm(this.article);
      }).catch(error => {
        console.error(error);
      })
    }
    else {
      this.article = new Article();
    }
  }
  
  ngOnDestroy(): void {
    this.dataStorage.document = undefined;
    this.dataStorage.documentId = ``;
  }

  fillForm(article: any) {
    this.articleForm.get(`title`)?.setValue(article.title);
    // this.articleForm.get(`image`)?.setValue(article.photoUrl);
    this.selectedUrl = article.photoUrl;
    this.articleForm.get(`text`)?.setValue(article.text);
    this.articleForm.get(`dateReleased`)?.setValue(new Date(article.dateReleased?.seconds * 1000));
    this.selectedUrl = article.photoUrl;
  }

  createArticle() {
    this.article.title = this.articleForm.get(`title`)?.value;
    // this.article.photoUrl = this.articleForm.get(`image`)?.value;
    this.article.text = this.articleForm.get(`text`)?.value;
    this.article.dateUploaded = new Date();
    this.article.dateReleased = this.articleForm.get(`dateReleased`)?.value ?? new Date();
  }


  getFile(eventTarget: any) {
    if (eventTarget.files && eventTarget.files.length > 0) {
      if (eventTarget.files[0].type != "image/jpeg") {
        console.log(`invalid file type`);
        return;
      }
      if (eventTarget.files[0].size > this.fileUpload.imageMaxSize) {
        console.log(`${eventTarget.files[0].size} > ${this.fileUpload.imageMaxSize}`);
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
      this.selectedUrl = this.article.postImageUrl;
    }
  }

  uploadArticle() {
    if (this.article.id) {
      return this.firebase.updateDocument(DocumentTypes.article, this.article);
    } else {
      return this.firebase.addDocument(DocumentTypes.article, this.article).then(() => {
        this.modalHelper.openMessageModal(this.dialogService,StatusMessage.success);
      })
    }
  }

  getFormControlValidations(formControlErrors: ValidationErrors | null | undefined) {
    console.log(formControlErrors);
  }

  async onFormSubmit() {
    if (this.articleForm.valid) {
      this.createArticle();

      if(this.file || !this.selectedUrl){
        let filepath = this.fileUpload.formatFileBucketName(FileBuckets.article, this.article.title, this.file.name);
        try{
          this.article.postImageUrl = await this.fileUpload.uploadFile(this.file, filepath);
        }catch(e){
          console.error(e);
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
          return;  
        }
      }else{
        this.article.postImageUrl = this.selectedUrl;
      }

      this.uploadArticle().then(()=>{
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.success);
        this.router.navigate([`admin/upload/index`]);
      }).catch(error => {
        console.error(error);
        this.modalHelper.openMessageModal(this.dialogService,StatusMessage.error);
      });;

      // let filepath = this.fileUpload.formatFileBucketName(FileBuckets.article, this.article.title, this.file.name);
      // this.fileUpload.uploadFile(this.file, filepath)
      //   .then(imageUrl => {
      //     this.article.photoUrl = imageUrl;
      //   }).then(() => {
      //     this.uploadArticle();
      //     this.modalHelper.openMessageModal(this.dialogService,StatusMessage.success)
      //     // this.router.navigate([`admin/upload/index`]);
      //   }).catch(error => {
      //     console.error(error)
      //   });
    }
    else {
      this.modalHelper.openMessageModal(this.dialogService, StatusMessage.validationError);
    }
  }

}
