import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { FestivalsComponent } from './components/festivals/festivals.component';
import { GridComponentComponent } from './components/grid-component/grid-component.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostersComponent } from './components/posters/posters.component';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';
import { MainSiteComponent } from './main-site.component';

const routes: Routes = [
  {
    path: ``, component: MainSiteComponent, children: [
      { path:``, component: HomepageComponent},
      { path: `articles`, component: ArticlesComponent},
      { path: `articles/single`, component: SingleDocumentComponent},
      // { path: `festivals`, component: FestivalsComponent },
      // { path: `festivals/single`, component: SingleDocumentComponent},
      { path: `posters`, component: PostersComponent },
      { path: `posters/single`, component: SingleDocumentComponent},
      { path: `presentations`, component:PresentationsComponent },
      { path: `presentations/single`, component: SingleDocumentComponent},
      { path: `about`, component: AboutComponent },
    ]
  },
  { path:`admin`, redirectTo:`/admin`, pathMatch:`full`},
  { path: `**`, redirectTo: ``, pathMatch:`full` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSiteRoutingModule { }
