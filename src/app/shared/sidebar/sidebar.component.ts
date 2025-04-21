import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  isAdmin : Boolean =false;
  isUser : Boolean =false;
  email: string ='';


  constructor(private authService: AuthService,private router: Router) {}

ngOnInit() {
  if (this.authService.isAdmin()) {
    this.isAdmin=true;
  }
  if (this.authService.isUser()) {
    this.isUser=true
  }
  this.email=this.authService.getEmail();

}

logout(){
  this.authService.logout();
  this.router.navigate(['/auth/login']);
}
}

