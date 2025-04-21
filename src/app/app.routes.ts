import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './features/public/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public/landing-page/landing-page.component').then(m => m.LandingPageComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/public/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes').then(m => m.USER_ROUTES),
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '**',
    redirectTo: '',
  }

];
