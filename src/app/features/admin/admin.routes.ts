import { Routes } from '@angular/router';


import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { ActorAddComponent } from './actor-add/actor-add.component';
import { ActorEditComponent } from './actor-edit/actor-edit.component';
import { DirectorListComponent } from './director-list/director-list.component';
import { DirectorAddComponent } from './director-add/director-add.component';
import { DirectorEditComponent } from './director-edit/director-edit.component';
import { FilmAddComponent } from './film-add/film-add.component';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AdminGuard } from '../../guards/admin.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      // dashboard
      {path: 'dashboard', component:AdminDashboardComponent},

      // Actors
      { path: 'actors', component: ActorListComponent },
      { path: 'actors/add', component: ActorAddComponent },
      { path: 'actors/edit/:id', component: ActorEditComponent },

      //Directors
      { path: 'directors', component: DirectorListComponent },
      { path: 'directors/add', component: DirectorAddComponent },
      { path: 'directors/edit/:id', component: DirectorEditComponent },

      // Films
       { path: 'films', component: FilmListComponent },
       { path: 'films/add', component: FilmAddComponent },
       { path: 'films/edit/:id', component: FilmEditComponent }
    ]
  }
];
