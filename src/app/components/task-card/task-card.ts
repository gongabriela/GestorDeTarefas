import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input({ required: true }) task!: ITask; // Recebe a tarefa como input para exibir os detalhes
  
  @Output () editTask = new EventEmitter<ITask>(); // Emite um evento quando a tarefa é editada
  onEditTask(task: ITask) : void {
    this.editTask.emit(task);
  }

  @Output () deleteTask = new EventEmitter<ITask>(); // Emite um evento quando a tarefa é deletada
  onDeleteTask(task: ITask) : void {
    this.deleteTask.emit(task);
  }
}

