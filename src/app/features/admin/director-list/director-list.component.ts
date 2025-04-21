import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectorService } from '../../../core/services/director.service';
import { Director } from '../../../models/director.model';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-director-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './director-list.component.html'
})
export class DirectorListComponent implements OnInit {
  directors: Director[] = [];
  selectedDirector: Director | null = null;

  constructor(private directorService: DirectorService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.directorService.getAll().subscribe(data => {
      this.directors = data;
    });
  }

openConfirmModal(director: Director) {
  this.selectedDirector = director;
}

loadDirectors(){
  this.directorService.getAll().subscribe(data => this.directors = data);
}

deleteDirector() {
  if (!this.selectedDirector) return;
  this.directorService.delete(this.selectedDirector.id).subscribe( {
    next: res => {
      console.log(res.message);
      this.loadDirectors();
      this.selectedDirector=null;
      this.toastr.success(res.message, 'Succès');
    },
    error: err => {
      this.loadDirectors();
      this.selectedDirector=null;
      this.toastr.error(err.error.message, 'Erreur');
    }
  });
}
}
