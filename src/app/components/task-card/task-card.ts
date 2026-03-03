import { Component, Input } from '@angular/core';
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
}
