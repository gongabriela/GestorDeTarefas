import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css'
})
export class DeleteModal {
  
  @Input() taskTitle = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancelModal = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancelModal.emit();
  }
}