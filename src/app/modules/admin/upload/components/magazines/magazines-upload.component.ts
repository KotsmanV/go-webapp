import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { DocumentTypes, FileBuckets, Magazine, Presentation } from 'src/app/models/database-models';
import { StatusMessage } from 'src/app/models/enums';
import { generateRandomId } from 'src/app/modules/main-site/helpers/general-helpers';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalHelper } from 'src/app/services/modal-helper.service';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines-upload.component.html',
  styleUrls: ['./magazines-upload.component.css']
})
export class MagazineUploadComponent implements OnInit {

  constructor(private fileUpload: FileUploadService,
    private firebase: FirebaseService,
    private dataStorage: DataStorageService,
    private dialogService: NbDialogService,
    private modalHelper: ModalHelper,
    public domSanitizer: DomSanitizer,
    private router: Router) { }

  tinymceId = generateRandomId();
  magazine!: Magazine;
  allowedImageTypes = this.fileUpload.allowedFileTypes.image.join();
  allowedDocumentTypes = this.fileUpload.allowedFileTypes.pdf.join();

  urls = {
    postImageUrl: ``,
    pdf: ``
  }

  selectedCoverUrl!: string;
  selectedPdfUrl!: string;

  coverFile: any;
  pdfFile: any;

  magazineForm = new FormGroup({
    title: new FormControl(``, [
      Validators.required,
      Validators.minLength(5)
    ]),
    postImageUrl: new FormControl(``),
    pdf: new FormControl(``),
    dateReleased: new FormControl(new Date()),
    text: new FormControl(``),
    synopsis: new FormControl(``)
  })

  ngOnInit(): void {
    this.initializeMagazine();
  }

  ngOnDestroy(): void {
    this.dataStorage.document = undefined;
  }

  initializeMagazine() {
    if (this.dataStorage.document?.id) {
      this.firebase.getDocument(this.dataStorage.document.id, DocumentTypes.presentation).then(response => {
        this.magazine = response as Presentation;
        this.magazine.id = this.dataStorage.document!.id;
        this.fillForm(this.magazine);
      }).catch(error => {
        console.error(error);
      })
    }
  }

  fillForm(magazine: any) {
    this.magazineForm.get(`title`)?.setValue(magazine.title);
    this.magazineForm.get(`text`)?.setValue(magazine.text);
    this.magazineForm.get(`synopsis`)?.setValue(magazine.synopsis);
    this.magazineForm.get(`dateReleased`)?.setValue(new Date(magazine.dateReleased.seconds * 1000));
    this.urls.postImageUrl = magazine.coverUrl;
    this.urls.pdf = magazine.pdfUrl;


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

      if (type != `pdf` && eventTarget.files[0].size > this.fileUpload.fileMaxSize) {
        console.log(`${eventTarget.files[0].size} > ${this.fileUpload.fileMaxSize}`);
        if (type == `poster`) {
          this.magazineForm.get(`poster`)?.setValue(null);
        } else if (type == `cover`) {
          this.coverFile = null;
          this.urls.postImageUrl = ``;
          this.magazineForm.get(`cover`)?.setValue(null);
        }
        this.modalHelper.openMessageModal(this.dialogService, StatusMessage.imageSizeError);
        return;
      }
      if (type == `pdf`) {
        this.pdfFile = eventTarget.files[0];
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
        if (type == `postImageUrl`) {
          this.urls.postImageUrl = event.target.result;
        } else if (type = `pdf`) {
          this.urls.pdf = event.target.result;
        }
      }
      reader.readAsDataURL(eventTarget.files[0]);
    } else {
      if (type == `cover`) {
        this.urls.postImageUrl = this.magazine.postImageUrl;
      } else if (type = `pdf`) {
        this.urls.pdf = this.magazine.pdfUrl;
      }
    }
  }

  openPdfModal(event: any) {
    event.preventDefault();
    this.modalHelper.openPdfModal(this.dialogService, this.urls.pdf);
  }

  createPresentation() {
    if(!this.magazine){
      this.magazine = new Presentation();
    }
    this.magazine.title = this.magazineForm.get(`title`)?.value;
    this.magazine.text = this.magazineForm.get(`text`)?.value;
    this.magazine.synopsis = this.magazineForm.get(`synopsis`)?.value;
    this.magazine.dateReleased = this.magazineForm.get(`dateReleased`)?.value;
    this.magazine.synopsis = this.magazineForm.get(`synopsis`)?.value;
  }

  async uploadFiles() {
    let uploadErrors: string[] = [];
    if (this.magazineForm.get(`cover`)?.dirty) {
      let coverFilepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.magazine.title, this.coverFile.name);
      try {
        this.magazine.postImageUrl = await this.fileUpload.uploadFile(this.coverFile, coverFilepath);
      } catch (e) {
        console.error(e);
        uploadErrors.push("Το εξώφυλλο δεν ανέβηκε.")
      }
    }

    if (this.magazineForm.get(`pdf`)?.dirty) {
      let pdfFilepath = this.fileUpload.formatFileBucketName(FileBuckets.presentation, this.magazine.title, this.pdfFile.name);
      try {
        this.magazine.pdfUrl = await this.fileUpload.uploadFile(this.pdfFile, pdfFilepath);
      } catch (e) {
        console.error(e);
        uploadErrors.push("Η εισήγηση δεν ανέβηκε.")
      }
    }
    return uploadErrors;
  }

  uploadPresentation() {
    if (this.magazine.id) {
      this.firebase.updateDocument(DocumentTypes.presentation, this.magazine)
        .then(() => {
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.success);
          this.router.navigate([`admin/upload/index`]);
        })
        .catch(error => {
          console.error(`error updating poster`, error);
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
        })
    } else {
      this.firebase.addDocument(DocumentTypes.presentation, this.magazine)
        .then(() => {
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.success);
          this.router.navigate([`admin/upload/index`]);
        })
        .catch(error => {
          console.error(error);
          this.modalHelper.openMessageModal(this.dialogService, StatusMessage.error);
        });
    }
  }


  async onFormSubmit() {
    if (this.magazineForm.valid) {
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
