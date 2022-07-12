import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DocumentTypes, FileBuckets, Presentation } from 'src/app/models/database-models';
import { StatusMessage } from 'src/app/models/enums';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalHelper } from 'src/app/services/modal-helper.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations-upload.component.html',
  styleUrls: ['./presentations-upload.component.css']
})
export class PresentationUploadComponent implements OnInit {

  constructor(private fileUpload: FileUploadService,
    private firebase: FirebaseService,
    private dataStorage: DataStorageService,
    private dialogService: NbDialogService,
    private modalHelper: ModalHelper,
    public domSanitizer: DomSanitizer,
    private router: Router) { }

  presentation!: Presentation;
  allowedImageTypes = this.fileUpload.allowedFileTypes.image.join();
  allowedDocumentTypes = this.fileUpload.allowedFileTypes.pdf.join();

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
      this.presentation = new Presentation(``, ``, new Date());
    }
  }

  fillForm(presentation: any) {
    this.presentationForm.get(`title`)?.setValue(presentation.title);
    this.presentationForm.get(`text`)?.setValue(presentation.text);
    this.presentationForm.get(`dateReleased`)?.setValue(new Date(presentation.dateReleased.seconds * 1000));
    this.urls.poster = presentation.posterUrl;
    this.urls.cover = presentation.coverUrl;
    this.urls.pdf = presentation.pdfUrl;
  }

  getFile(eventTarget: any, type: string) {
    if (eventTarget.files && eventTarget.files.length > 0) {
      if (type != `pdf` && (eventTarget.files[0].type != `image/jpeg` && eventTarget.files[0].type != `image/jpg`)) {
        console.log(`invalid file type`);
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.invalidFileError);
        return;
      } else if (type == `pdf` && eventTarget.files[0].type != `application/pdf`) {
        console.log(`invalid file type`);
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.invalidFileError);
        return;
      }

      if (type != `pdf` && eventTarget.files[0].size > this.fileUpload.imageMaxSize) {
        console.log(`${eventTarget.files[0].size} > ${this.fileUpload.imageMaxSize}`);
        if (type == `poster`) {
          this.posterFile = null;
          this.urls.poster = ``;
          this.presentationForm.get(`poster`)?.setValue(null);
        } else if (type == `cover`) {
          this.coverFile = null;
          this.urls.cover = ``;
          this.presentationForm.get(`cover`)?.setValue(null);
        }
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.imageSizeError);
        return;
      }
      if (type == `pdf`) {
        this.pdfFile = eventTarget.files[0];
        return;
      }
      if (type == `poster`) {
        this.posterFile = eventTarget.files[0];
        return;
      }
      if (type == `cover`) {
        this.coverFile = eventTarget.files[0];
        return;
      }
    }
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
          this.urls.pdf = event.target.result;
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

  openPdfModal(event:any) {
    event.preventDefault();
    this.modalHelper.openPdfModal(this.dialogService, this.urls.pdf);
  }

  createPresentation() {
    this.presentation = new Presentation(
      this.presentationForm.get(`title`)?.value,
      this.presentationForm.get(`text`)?.value,
      this.presentationForm.get(`dateReleased`)?.value
    );
  }

  async uploadFiles() {
    let uploadErrors: string[] = [];

    if (!this.presentation.coverUrl) {
      let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, this.coverFile.name);
      try {
        this.presentation.coverUrl = await this.fileUpload.uploadFile(this.coverFile, filepath);
      } catch (e) {
        console.error(e);
        uploadErrors.push("Το εξώφυλλο δεν ανέβηκε.")
      }
    }
    if (!this.presentation.posterUrl) {
      let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, this.posterFile.name);
      try {
        this.presentation.posterUrl = this.presentation.postImageUrl = await this.fileUpload.uploadFile(this.posterFile, filepath);
      } catch (e) {
        console.error(e);
        uploadErrors.push("Η αφίσα δεν ανέβηκε.")
      }
    }

    if (!this.presentation.pdfUrl) {
      let filepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.presentation.title, this.pdfFile.name);
      try {
        this.presentation.pdfUrl = await this.fileUpload.uploadFile(this.pdfFile, filepath);
      } catch (e) {
        console.error(e);
        uploadErrors.push("Η εισήγηση δεν ανέβηκε.")
      }
    }
    return uploadErrors;
  }

  uploadPresentation() {
    if (this.presentation.id) {
      this.firebase.updateDocument(DocumentTypes.poster, this.presentation).catch(error => {
        console.error(`error updating poster`, error);
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
      })
    } else {
      this.firebase.addDocument(DocumentTypes.presentation, this.presentation)
        .catch(error => {
          console.error(error);
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
        });
    }
  }


  async onFormSubmit() {
    if (this.presentationForm.valid) {
      this.createPresentation();

      let uploadErrors: string[] = await this.uploadFiles();
      if (uploadErrors.length > 0) {
        this.modalHelper.openMessageModal(this.dialogService, uploadErrors);
        return;
      }
      this.uploadPresentation();

    } else {
      this.modalHelper.openMessageModal(this.dialogService, StatusMessage.validationError);
    }
  }
}
