import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule, RouterLink ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: ITask;

  @Output () deleteTask = new EventEmitter<ITask>();
  onDeleteTask(task: ITask) : void {
    this.deleteTask.emit(task);
  }
}

