import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSiteComponent } from './main-site.component';

const routes: Routes = [
  {
    path: ``, component: MainSiteComponent, children: [
      { path: `articles`, redirectTo: `` },
      { path: `festivals`, redirectTo: `` },
      { path: `posters`, redirectTo: `` },
      { path: `presentaitions`, redirectTo: `` },
      { path: `about`, redirectTo: `` }
    ]
  },
  { path: `**`, redirectTo: `` },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainSiteRoutingModule { }
