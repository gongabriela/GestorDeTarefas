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

  tasks: ITask[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  get todoTasks() : ITask[] {
    return this.tasks.filter(task => task.status === 'To Do');
  }

  get doingTasks() : ITask[] {
    return this.tasks.filter(task => task.status === 'Doing');
  }

  get doneTasks() : ITask[] {
    return this.tasks.filter(task => task.status === 'Done');
  }
  
  handleDeleteTask(selectedTask: ITask) {
    this.taskService.deleteTaskWithConfirmation(selectedTask)
      .subscribe(deleted => {
        if (deleted) {
          this.tasks = this.taskService.getTasks();
        }
      });
  }
}