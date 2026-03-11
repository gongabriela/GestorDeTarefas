import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITask } from '../models/task.model';
import { DeleteModalService } from './delete-modal-service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private deleteModalService = inject(DeleteModalService);

  private readonly STORAGE_KEY = 'taskList';

  getTasks(): ITask[] {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  addTask(task: ITask): void {
    const tasks = this.getTasks();
    tasks.push(task);
    if (typeof localStorage !== 'undefined')
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.getTasks();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    if (typeof localStorage !== 'undefined')
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
  }

  getTaskById(id: number): ITask | undefined {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === id);
  }

  updateTask(updatedTask: ITask): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      if (typeof localStorage !== 'undefined')
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  deleteTaskWithConfirmation(task: ITask): Observable<boolean> {
    return this.deleteModalService.openConfirm(task.title).pipe(
      tap((confirmed) => {
        if (confirmed) {
          this.deleteTask(task.id);
        }
      }),
    );
  }
}
