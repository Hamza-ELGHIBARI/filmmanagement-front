import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { Film } from '../../../models/film.model';
import { FilmService } from '../../../core/services/film.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements OnInit {
  films: Film[]=[];
  loggedIn: Boolean=false;
  isAdmin: Boolean=false;
  isUser: Boolean=false;
  email: string='';

  constructor(private filmService: FilmService,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loggedIn=this.authService.isLoggedIn();
    this.email=this.authService.getEmail();
    this.isAdmin=this.authService.isAdmin();
    this.isUser=this.authService.isUser();
    this.filmService.getAllFilms().subscribe({ 
      next: (films) => {
       this.films =films;
    },
    error: (err) => {
      console.log(err);
    }});

  }
}
