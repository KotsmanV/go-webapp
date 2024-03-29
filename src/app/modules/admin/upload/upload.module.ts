import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadIndexComponent } from './components/upload-index/upload-index.component';

//UPLOAD COMPONENTS
import { UploadBaseComponent } from './components/upload-home/upload-base.component';
import { PosterUploadComponent } from './components/posters/posters-upload.component';
import { FestivalUploadComponent } from './components/festivals/festivals-upload.component';
import { MagazineUploadComponent } from './components/magazines/magazines-upload.component';
import { PresentationUploadComponent } from './components/presentations/presentations-upload.component';
import { ArticleUploadComponent } from './components/articles/articles-upload.component';
//NEBULAR
import {  
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbRouteTabsetModule,
  NbButtonModule, 
  NbTreeGridModule, 
  NbDialogModule,  
  NbDatepickerModule,
  NbTabsetModule
} from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerModalComponent } from './components/modals/pdf-viewer-modal/pdf-viewer-modal.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CharCounterComponent } from './components/char-counter/char-counter.component';

//MODALS
import { FileViewModalComponent } from './components/file-view-modal/file-view-modal.component';
import { InfoMessageModalComponent } from './components/modals/info-message-modal/info-message-modal.component';

@NgModule({
  declarations: [
    FileViewModalComponent,
    InfoMessageModalComponent,
    //UPLOAD COMPONENTS
    UploadBaseComponent,
    PosterUploadComponent,
    FestivalUploadComponent,
    MagazineUploadComponent,
    UploadIndexComponent,
    FileViewModalComponent,
    PresentationUploadComponent,
    ArticleUploadComponent,
    InfoMessageModalComponent,
    PdfViewerModalComponent,
    CharCounterComponent
  ],
  imports: [
    CommonModule,
    UploadRoutingModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule,
    NbTabsetModule,
    NbDialogModule.forRoot(),
    NbDatepickerModule.forRoot(),
    MatTableModule,
    PdfViewerModule,
    EditorModule
  ],
  providers:[
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class UploadModule { }
