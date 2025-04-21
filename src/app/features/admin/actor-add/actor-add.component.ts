import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActorService } from '../../../core/services/actor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actor-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actor-add.component.html',
})
export class ActorAddComponent {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nationality: ['', Validators.required]
  });
   loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private actorService: ActorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit() {
    if (this.form.valid) {
      this.loading=true;
    //  setTimeout(() => 
      this.actorService.addActor(this.form.value) .subscribe( {
        next: res => {
          this.loading=false;
          console.log(res.message);
          this.toastr.success(res.message, 'Succès');
          this.router.navigate(['/admin/actors']);
        },
        error: err => {
          this.loading=false;
          this.toastr.error(err.error.message, 'Erreur');
        }
      })
      //,3000);
    }
  }
}
