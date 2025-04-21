import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activate-account.component.html',
})
export class ActivateAccountComponent implements OnInit {
  success = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.activateAccount(token).subscribe({
        next: () => {
          this.success = 'Compte activé ! Vous pouvez maintenant vous connecter.';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: err => this.error = err.error?.message || 'Échec de l’activation'
      });
    } else {
      this.error = 'Token non fourni.';
    }
  }
}
