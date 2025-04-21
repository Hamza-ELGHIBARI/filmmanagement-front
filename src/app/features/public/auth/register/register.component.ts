import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  error = '';
  success = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [['ROLE_USER']]
    });
  }

  submit() {
    if (this.form.invalid) return;
     this.loading=true;
     this.success='';
     this.error='';
    this.authService.register(this.form.value).subscribe({
      next: res => {
        this.loading=false;
        this.success = 'Inscription réussie ! Vérifiez votre email.'
      },
      error: (err) => {
        this.loading=false;
        this.error = err.error?.message || 'Échec de l’inscription'
      }
    });
  }
}
