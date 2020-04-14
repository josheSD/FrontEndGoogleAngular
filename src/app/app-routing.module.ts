import { LogueadoGuard } from './guard/logueado.guard';
import { LoginGuard } from './guard/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './layouts/admin/admin.component';
import { AuthComponent } from './layouts/auth/auth.component';

import { NotFoundPageComponent } from './shared/not-found-page/not-found-page.component';


const routes: Routes = [
  {
    path:'', redirectTo:'login',pathMatch:'full'
  },
  {
    path:'',component: AdminComponent, data:{title:'Administrador'},
    canActivate: [LoginGuard],
    children: [
        {path:'',loadChildren:() => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)}
    ]
  },
  {
    path:'',component: AuthComponent, data:{title:'Authentication'},
    canActivate: [LogueadoGuard],
    children:[
      {path:'',loadChildren:() => import('./pages/pages.module').then(m => m.PagesModule)}
    ]
  },
  {
    path:'**', component: NotFoundPageComponent, data:{title:'Pagina no encontrada'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
