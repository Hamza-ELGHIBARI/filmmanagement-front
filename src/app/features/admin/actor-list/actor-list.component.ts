import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Actor } from '../../../models/actor.model';
import { ActorService } from '../../../core/services/actor.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actor-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogComponent],
  templateUrl: './actor-list.component.html',
})
export class ActorListComponent implements OnInit {
  actors: Actor[] = [];
  selectedActor: Actor | null = null;
  constructor(private actorService: ActorService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadActors();
  }

openConfirmModal(actor: Actor) {
  this.selectedActor = actor;
}

loadActors(){
  this.actorService.getActors().subscribe(data => this.actors = data);
}

deleteActor() {
  if (!this.selectedActor) return;
  this.actorService.deleteActor(this.selectedActor.id).subscribe({
    next: res => {
      console.log(res.message);
      this.toastr.success(res.message, 'Succès');
      this.loadActors();
      this.selectedActor=null;
    },
    error: err => {
      console.log(err.error);
      this.toastr.error(err.error.message, 'Erreur');
    }
  });
}
}
