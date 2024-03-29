import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: ``, redirectTo: `home`, pathMatch:`full` },
  { path: `home`, loadChildren: () => import(`./modules/main-site/main-site.module`).then(m => m.MainSiteModule) },
  { path: `admin`, loadChildren: () => import(`./modules/admin/admin.module`).then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
