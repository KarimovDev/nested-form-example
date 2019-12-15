import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@nf-shared/not-found.component';
import { AuthGuardActivate, AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'display',
    loadChildren: () =>
      import('./display/display.module').then(m => m.DisplayModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuardActivate],
  },
  {
    path: '',
    loadChildren: () => import('./form/form.module').then(m => m.FormModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
