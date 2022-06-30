import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { FestivalsComponent } from './components/festivals/festivals.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostersComponent } from './components/posters/posters.component';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { MainSiteComponent } from './main-site.component';

const routes: Routes = [
  {
    path: ``, component: MainSiteComponent, children: [
      { path:``, component: HomepageComponent},
      { path: `articles`, component: ArticlesComponent },
      { path: `festivals`, component: FestivalsComponent },
      { path: `posters`, component: PostersComponent },
      { path: `presentations`, component:PresentationsComponent },
      { path: `about`, component: AboutComponent },
    ]
  },
  { path: `**`, redirectTo: `` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSiteRoutingModule { }
