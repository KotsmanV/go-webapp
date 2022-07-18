import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/index_articles/articles.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostersComponent } from './components/index_posters/posters.component';
import { PresentationsComponent } from './components/index_presentations/presentations.component';
import { MainSiteComponent } from './main-site.component';
import { ArticleSingleComponent } from './components/single_article/article-single.component';
import { PosterSingleComponent } from './components/single_poster/poster-single.component';
import { PresentationSingleComponent } from './components/single_presentation/presentation-single.component';

const routes: Routes = [
  {
    path: ``, component: MainSiteComponent, children: [
      { path:``, component: HomepageComponent},
      { path: `articles`, component: ArticlesComponent},
      { path: `articles/single`, component: ArticleSingleComponent},
      // { path: `festivals`, component: FestivalsComponent },
      // { path: `festivals/single`, component: SingleDocumentComponent},
      { path: `posters`, component: PostersComponent },
      { path: `posters/single`, component: PosterSingleComponent},
      { path: `presentations`, component:PresentationsComponent },
      { path: `presentations/single`, component: PresentationSingleComponent},
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
