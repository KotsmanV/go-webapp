import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:``, component:AdminDashboardComponent, canActivate:[AuthGuard],  children:[
  // { path:``, component:AdminDashboardComponent,  children:[
    { path:`upload`, loadChildren: ()=> import(`./upload/upload.module`).then(m=>m.UploadModule)}
  ]},
  { path:`login`, component:LoginComponent},
  { path: `**`, canActivate:[AuthGuard], component: AdminDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
