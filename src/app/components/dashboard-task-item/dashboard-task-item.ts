import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ITask } from '../../models/task.model';
import { CategoryIconPipe } from '../../pipes/category-icon-pipe';

@Component({
  selector: 'app-dashboard-task-item',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryIconPipe],
  templateUrl: './dashboard-task-item.html',
  styleUrl: './dashboard-task-item.css'
})
export class DashboardTaskItem {

  @Input({ required: true }) task!: ITask;
  @Output() complete = new EventEmitter<number>();

  onCompleteClick() : void {
    this.complete.emit(this.task.id);
  }
}