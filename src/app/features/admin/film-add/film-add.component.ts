import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DirectorService } from '../../../core/services/director.service';
import { FilmService } from '../../../core/services/film.service';
import { ActorService } from '../../../core/services/actor.service';
import { Actor } from '../../../models/actor.model';
import { Director } from '../../../models/director.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-film-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './film-add.component.html'
})
export class FilmAddComponent implements OnInit {


    constructor(
      private fb: FormBuilder,
      private actorService: ActorService,
      private directorService: DirectorService,
      private filmService: FilmService,
      private router: Router,
      private toastr: ToastrService
    ) {}

  actors: Actor[] = [];
  directors: Director[] = [];
  selectedPosterFile: File | null = null;
  loading: Boolean=false;
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    releaseDate: ['', Validators.required],
    director: [null, Validators.required],
    actors: [[], Validators.required],
  });

  ngOnInit(): void {
    this.actorService.getActors().subscribe(actors => this.actors = actors);
    this.directorService.getAll().subscribe(directors => this.directors = directors);
  }

  onPosterChange(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      this.selectedPosterFile = file;
    }
  }

  submit(): void {
    console.log(this.form.invalid );
     if (this.form.invalid || !this.selectedPosterFile) return;
     this.loading=true;
    const formData = {
      ...this.form.value,
      poster: this.selectedPosterFile
    };

    this.filmService.create(formData).subscribe({
      next: res => {
        this.loading=false;
        console.log(res.message);
        this.toastr.success(res.message, 'Succès');
        this.router.navigate(['/admin/films']);
      },
      error: err => {
        this.loading=false;
        this.toastr.error(err.error.message, 'Erreur');
      }
    });
  }
}
