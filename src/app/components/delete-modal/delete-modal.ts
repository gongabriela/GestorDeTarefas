import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css'
})
export class DeleteModal {
  
  @Input() taskTitle: string = '';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}