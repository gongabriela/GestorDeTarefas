import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-dashboard-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-task-item.html',
  styleUrl: './dashboard-task-item.css'
})
export class DashboardTaskItem {

  @Input({ required: true }) task!: ITask;
  @Output() complete = new EventEmitter<number>();

  onCompleteClick() : void {
    this.complete.emit(this.task.id);
  }
  
  get categoryIcon(): string {
    const cat = this.task.category.toLowerCase();
    switch (cat) {
      case 'personal': return 'fa-user';
      case 'study': return 'fa-book-open';
      case 'work': return 'fa-briefcase';
      case 'urgent': return 'fa-bolt';   
      default: return 'fa-list-check';
    }
  }

  get categoryClass(): string {
    return `cat-${this.task.category.toLowerCase()}`;
  }
}