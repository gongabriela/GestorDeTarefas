import { Component, OnInit } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../services/task-service';
import { DeleteModalService } from '../../services/delete-modal-service';

@Component({
  selector: 'app-task-list',
  imports: [TaskCard],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {

  tasks: ITask[] = [];

  constructor(
    private taskService: TaskService,
    private deleteModalService: DeleteModalService
  ) {};

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  handleDeleteTask(selectedTask: ITask) {
    this.deleteModalService.openConfirm(selectedTask.title)
    .subscribe((respostaDoUtilizador: boolean) => {
      if (respostaDoUtilizador === true) {
        this.taskService.deleteTask(selectedTask.id);
        this.tasks = this.taskService.getTasks(); 
      } else {
      }
    });
  }
}