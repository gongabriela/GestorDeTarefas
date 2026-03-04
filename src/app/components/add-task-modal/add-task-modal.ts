import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task-modal',
  imports: [],
  templateUrl: './add-task-modal.html',
  styleUrl: './add-task-modal.css',
})
export class AddTaskModal {
  @Output() close = new EventEmitter<void>();
  onCancel() {
    this.close.emit();
  }
}
