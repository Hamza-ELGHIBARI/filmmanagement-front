import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  styles: [`
    .modal-bg { @apply fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center; }
    .modal-content { @apply bg-white p-6 rounded-xl shadow-xl w-full max-w-md; }
  `]
})
export class ConfirmDialogComponent {
  @Input() message = 'Are you sure you want to delete this item?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
