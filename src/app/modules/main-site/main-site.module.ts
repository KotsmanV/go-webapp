import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainSiteRoutingModule } from './main-site-routing.module';
import { MainSiteComponent } from './main-site.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BannerComponent } from './components/banner/banner.component';
import { HomepageComponent } from './components/homepage/homepage.component';


@NgModule({
  declarations: [
    MainSiteComponent,
    HeaderComponent,
    NavbarComponent,
    BannerComponent,
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    MainSiteRoutingModule
  ]
})
export class MainSiteModule { }
