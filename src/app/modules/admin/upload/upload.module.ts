import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { UploadRoutingModule } from './upload-routing.module';
import { PosterUploadComponent } from './components/posters/posters-upload.component';
import { FestivalUploadComponent } from './components/festivals/festivals-upload.component';
import { TextUploadComponent } from './components/texts/texts-upload.component';
import { MagazineUploadComponent } from './components/magazines/magazines-upload.component';
import { UploadBaseComponent } from './components/upload-home/upload-base.component';
import { NbCardModule,NbInputModule,NbLayoutModule,NbRouteTabsetModule,NbButtonModule, NbTreeGridModule  } from '@nebular/theme';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadIndexComponent } from './components/upload-index/upload-index.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PosterUploadComponent,
    FestivalUploadComponent,
    TextUploadComponent,
    MagazineUploadComponent,
    UploadBaseComponent,
    UploadIndexComponent
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
  ]
})
export class UploadModule { }
