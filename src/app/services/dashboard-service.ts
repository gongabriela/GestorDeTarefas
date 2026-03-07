import { Injectable } from '@angular/core';
import { TaskService } from './task-service';
import { ITask } from '../models/task.model';
import { IDashboardKPIs } from '../models/kpi-data.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private taskService: TaskService) { }

  getKPIs(): IDashboardKPIs {
    const tasks = this.taskService.getTasks();
    const today = this.getTodayAtMidnight();

    let kpis: IDashboardKPIs = { total: tasks.length, completed: 0, inProgress: 0, overdue: 0 };

    tasks.forEach(task => {
      if (task.status === 'Done') kpis.completed++;
      if (task.status === 'Doing') kpis.inProgress++;
      if (this.isTaskOverdue(task, today)) kpis.overdue++;
    });

    return kpis;
  }

  getTasksDueToday(): ITask[] {
    const tasks = this.taskService.getTasks();
    const today = this.getTodayAtMidnight();

    return tasks.filter(task => this.isTaskDueToday(task, today));
  }

  private getTodayAtMidnight(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  private normalizeDate(date: Date | string): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }

  private isTaskOverdue(task: ITask, today: Date): boolean {
    if (task.status === 'Done') return false;
    
    const taskDate = this.normalizeDate(task.dueDate);
    return taskDate.getTime() < today.getTime();
  }

  private isTaskDueToday(task: ITask, today: Date): boolean {
    const taskDate = this.normalizeDate(task.dueDate);
    return taskDate.getTime() === today.getTime();
  }
}