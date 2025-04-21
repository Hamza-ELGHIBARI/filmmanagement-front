import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DirectorService } from '../../../core/services/director.service';
import { Director } from '../../../models/director.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-director-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './director-edit.component.html'
})
export class DirectorEditComponent implements OnInit {
  form = this.fb.group({
    firstName: [''],
    lastName: [''],
    nationality: ['']
  });
  loading: Boolean=false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private directorService: DirectorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const directorId = Number(this.route.snapshot.paramMap.get('id'));
    this.directorService.getById(directorId).subscribe(director => {
      this.form.patchValue(director);
    });
  }

  onSubmit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.form.valid) {
      const director: Director = {
        id: id,
        firstName: this.form.value.firstName ?? '',
        lastName: this.form.value.lastName ?? '',
        nationality: this.form.value.nationality ?? ''
      };
      this.directorService.update(id, director).subscribe( {
        next: res => {
          this.loading=false;
          console.log(res.message);
          this.toastr.success(res.message, 'Succès');
          this.router.navigate(['/admin/directors']);
        },
        error: err => {
          this.loading=false;
          this.toastr.error(err.error.message, 'Erreur');
        }
      });
    }
  }
}
