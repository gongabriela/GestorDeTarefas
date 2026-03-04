import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({ providedIn: 'root',})

export class TaskService {

  private STORAGE_KEY = 'taskList';

  constructor () {};

  getTasks() : ITask[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  addTask(task: ITask): void {
    const tasks = this.getTasks();
    tasks.push(task);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  };

}
