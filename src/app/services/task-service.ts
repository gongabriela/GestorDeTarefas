import { Injectable } from '@angular/core';
import { ITask } from '../models/task.model';

@Injectable({ providedIn: 'root',})

export class TaskService {

  private STORAGE_KEY = 'taskList';

  constructor () {};

  getTasks() : ITask[] {
    if (typeof localStorage !== 'undefined') {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
    }
    return [];
  };

  addTask(task: ITask): void {
    const tasks = this.getTasks();
    tasks.push(task);
    if (typeof localStorage !== 'undefined')
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  };

  deleteTask(taskId: string | number): void {
    const currentTasks = this.getTasks();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
  }
  }
