import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../../core/services/actor.service';
import { Actor } from '../../../models/actor.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actor-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './actor-edit.component.html',
})
export class ActorEditComponent implements OnInit {
  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    nationality: ['', Validators.required]
  });

  private actorId!: number;
   loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private actorService: ActorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.actorId = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActorById(this.actorId).subscribe(actor => {
      this.form.patchValue(actor);
    });
  }

  submit() {
    if (this.form.valid) {
      this.loading=true;
      this.actorService.updateActor(this.actorId, this.form.value).subscribe({
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
      });
    }
  }
}
