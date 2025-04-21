import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FilmService } from '../../../core/services/film.service';
import { Film } from '../../../models/film.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-film-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './film-list.component.html',
})
export class FilmListComponent implements OnInit {
  films: Film[] = [];
  selectedFilm: Film | null = null;

  constructor(private filmService: FilmService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  edit(filmId: number): void {
    this.router.navigate(['/admin/films/edit', filmId]);
  }

  
  openConfirmModal(film: Film) {
    this.selectedFilm = film;
  }
  
  loadFilms(){
    this.filmService.getAll().subscribe(data => this.films = data);
  }
  
  deleteFilm() {
    if (!this.selectedFilm) return;
    this.filmService.delete(this.selectedFilm.id).subscribe({
      next: res => {
        this.toastr.success(res.message, 'Succès');
        this.loadFilms();
        this.selectedFilm=null;
        this.router.navigate(['/admin/films']);
      },
      error: err => {
        this.toastr.error(err.error.message, 'Erreur');
      }
    });
  }
  }
  
