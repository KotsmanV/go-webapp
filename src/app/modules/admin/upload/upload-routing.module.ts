import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleUploadComponent } from './components/articles/articles-upload.component';
import { FestivalUploadComponent } from './components/festivals/festivals-upload.component';
import { MagazineUploadComponent } from './components/magazines/magazines-upload.component';
import { PosterUploadComponent } from './components/posters/posters-upload.component';
import { PresentationUploadComponent } from './components/presentations/presentations-upload.component';
import { TextUploadComponent } from './components/texts/texts-upload.component';
import { UploadBaseComponent } from './components/upload-home/upload-base.component';
import { UploadIndexComponent } from './components/upload-index/upload-index.component';

const routes: Routes = [
    { path:``, component: UploadBaseComponent, children:[
      { path:`index`, component:UploadIndexComponent },
      { path:`poster`, component:PosterUploadComponent},
      { path:`presentation`, component:PresentationUploadComponent},
      { path:`festival`, component:FestivalUploadComponent},
       { path:`presentation`, component:PresentationUploadComponent},
      { path:`magazine`, component:MagazineUploadComponent},
      { path:`article`, component:ArticleUploadComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
