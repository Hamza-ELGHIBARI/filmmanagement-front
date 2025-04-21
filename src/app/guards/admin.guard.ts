import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const roles = this.authService.getRoles(); // méthode qui extrait les rôles du token

    if (roles.includes('ROLE_ADMIN')) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
