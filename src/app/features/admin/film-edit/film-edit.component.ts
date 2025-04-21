import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actor } from '../../../models/actor.model';
import { Director } from '../../../models/director.model';
import { FilmService } from '../../../core/services/film.service';
import { ActorService } from '../../../core/services/actor.service';
import { DirectorListComponent } from '../director-list/director-list.component';
import { DirectorService } from '../../../core/services/director.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
})
export class FilmEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private filmService: FilmService,
    private actorService: ActorService,
    private directorService: DirectorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  filmId!: number;
  actors: Actor[] = [];
  directors: Director[] = [];
  selectedPosterFile: File | null = null;
  posterUrl: string | ArrayBuffer | null = null;
  loading: Boolean=false;

form = this.fb.group({
  title: this.fb.control<string>('', Validators.required),
  description: this.fb.control<string>('', Validators.required),
  releaseDate: this.fb.control<string>('', Validators.required),
  directorId: this.fb.control<number>(0, Validators.required),
  actors: this.fb.control<number[]>([], Validators.required),
  poster: this.fb.control<string>('') 
});


  ngOnInit(): void {
    this.filmId = +this.route.snapshot.paramMap.get('id')!;
    this.actorService.getActors().subscribe((actors) => (this.actors = actors));
    this.directorService.getAll().subscribe((directors) => (this.directors = directors));

    this.filmService.getById(this.filmId).subscribe((film) => {
      this.form.patchValue({
        title: film.title,
        description: film.description,
        releaseDate: film.releaseDate,
        directorId: film.director.id,
        actors: film.actors.map(actor => actor.id),
      });
      this.posterUrl=`http://localhost:8080/api/uploads/${film.poster}`
    });
  }


  onPosterChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPosterFile = file;
  
      const reader = new FileReader();
      reader.onload = () => {
        this.posterUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    const formData = {
      ...this.form.value,
      poster: this.selectedPosterFile
    };
    this.loading=true;
    this.filmService.update(this.filmId, formData).subscribe({
      next: res => {
        this.loading=false;
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