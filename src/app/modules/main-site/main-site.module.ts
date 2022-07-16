import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSiteRoutingModule } from './main-site-routing.module';
import { MainSiteComponent } from './main-site.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostersComponent } from './components/posters/posters.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { FestivalsComponent } from './components/festivals/festivals.component';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { AboutComponent } from './components/about/about.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GridComponentComponent } from './components/grid-component/grid-component.component';
import { SingleDocumentComponent } from './components/single-document/single-document.component';
import { SinglePostComponent } from './components/single-post/single-post.component';


@NgModule({
  declarations: [
    MainSiteComponent,
    HeaderComponent,
    NavbarComponent,
    BannerComponent,
    HomepageComponent,
    PostersComponent,
    ArticlesComponent,
    FestivalsComponent,
    PresentationsComponent,
    AboutComponent,
    LoaderComponent,
    GridComponentComponent,
    SingleDocumentComponent,
    SinglePostComponent,
  ],
  imports: [
    CommonModule,
    MainSiteRoutingModule
  ]
})
export class MainSiteModule { }
