import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSiteRoutingModule } from './main-site-routing.module';
import { MainSiteComponent } from './main-site.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomepageComponent } from './components/homepage/homepage.component';
//INDICES
import { PostersComponent } from './components/index_posters/posters.component';
import { ArticlesComponent } from './components/index_articles/articles.component';
import { FestivalsComponent } from './components/index_festivals/festivals.component';
import { PresentationsComponent } from './components/index_presentations/presentations.component';
//SINGLE VIEWS
import { AboutComponent } from './components/about/about.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';
import { PresentationSingleComponent } from './components/single_presentation/presentation-single.component';
import { PosterSingleComponent } from './components/single_poster/poster-single.component';
import { ArticleSingleComponent } from './components/single_article/article-single.component';
//HELPERS
import { SinglePostComponent } from './components/single-post/single-post.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GridComponentComponent } from './components/grid-component/grid-component.component';
import { NotFoundComponent } from './components/not-found/not-found.component';



@NgModule({
  declarations: [
    MainSiteComponent,
    HeaderComponent,
    NavbarComponent,
    BannerComponent,
    HomepageComponent,
    //INDICES
    PostersComponent,
    ArticlesComponent,
    FestivalsComponent,
    PresentationsComponent,
    //SINGLE VIEWS
    AboutComponent,
    SingleDocumentComponent,
    PresentationSingleComponent,
    PosterSingleComponent,
    ArticleSingleComponent,
    //HELPERS
    LoaderComponent,
    GridComponentComponent,
    SinglePostComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MainSiteRoutingModule
  ]
})
export class MainSiteModule { }
