import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DirectorService } from '../../../core/services/director.service';
import { Director } from '../../../models/director.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-director-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './director-add.component.html'
})
export class DirectorAddComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nationality: ['', Validators.required]
  });
  loading :Boolean=false;
  constructor(private fb: FormBuilder, private directorService: DirectorService, private router: Router,private toastr: ToastrService) {}

  onSubmit() {
    if (this.form.valid) {
      this.loading=true;
      this.directorService.create(this.form.value).subscribe( {
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
