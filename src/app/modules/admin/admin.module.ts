import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UploadModule } from './upload/upload.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NbThemeModule, NbLayoutModule,NbSidebarModule, NbMenuModule, NbCardModule, NbInputModule, NbButtonModule, NbTreeGridModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    UploadModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbInputModule,
    NbButtonModule,
    NbTreeGridModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot()
  ]
})
export class AdminModule { }
