import { Component, OnInit } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  constructor(private taskService: TaskService) {};

  handleEditTask(selectedTask: ITask) {
    console.log('Tarefa editada:', selectedTask);
  }

  handleDeleteTask(selectedTask: ITask) {
    console.log('Tarefa deletada:', selectedTask);
  }
  
  tasks: ITask[] = [];

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

}
