import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FestivalUploadComponent } from './components/festivals/festivals-upload.component';
import { MagazineUploadComponent } from './components/magazines/magazines-upload.component';
import { PosterUploadComponent } from './components/posters/posters-upload.component';
import { TextUploadComponent } from './components/texts/texts-upload.component';
import { UploadBaseComponent } from './components/upload-home/upload-base.component';
import { UploadIndexComponent } from './components/upload-index/upload-index.component';

const routes: Routes = [
    { path:``, component: UploadBaseComponent, children:[
      { path: `index`, component:UploadIndexComponent },
      { path:`posters`, component:PosterUploadComponent},
      { path:`festivals`, component:FestivalUploadComponent},
      { path:`texts`, component:TextUploadComponent},
      { path:`magazines`, component:MagazineUploadComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
