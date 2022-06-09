import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent, SignupComponent } from './features/auth';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  {
    path: 'signin',
    component: SigninComponent,
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(() => redirectLoggedInTo(['chat'])),
  },
  {
    path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
    loadChildren: () =>
      import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
