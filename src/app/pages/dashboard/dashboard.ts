import { Component, OnInit, inject } from '@angular/core';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { KpiData, IDashboardKPIs } from '../../models/kpi-data.model';
import { DashboardTaskItem } from '../../components/dashboard-task-item/dashboard-task-item';
import { DashboardService } from '../../services/dashboard-service';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
import { CategoryFilterService } from '../../services/category-filter-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCard, DashboardTaskItem],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);
  private taskService = inject(TaskService);
  private categoryFilterService = inject(CategoryFilterService);

  dueTodayTasks: ITask[] = [];

  ngOnInit(): void {
    this.dueTodayTasks = this.dashboardService.getTasksDueToday();
  }

  get filteredKpiList(): KpiData[] {
    const category = this.categoryFilterService.selectedCategory;
    const kpis: IDashboardKPIs = this.dashboardService.getKPIs(category);
    return [
      { title: 'Total Tasks', value: kpis.total, color: '#ffcc00' },
      { title: 'Completed', value: kpis.completed, color: '#00ff88' },
      { title: 'In Progress', value: kpis.inProgress, color: '#00e5ff' },
      { title: 'Overdue', value: kpis.overdue, color: '#ff4d4f' },
    ];
  }

  get filteredDueTodayTasks(): ITask[] {
    const category = this.categoryFilterService.selectedCategory;
    if (category === 'All') return this.dueTodayTasks;
    return this.dueTodayTasks.filter((task) => task.category === category);
  }

  handleCompleteTask(taskId: number): void {
    const task: ITask | undefined = this.taskService.getTaskById(taskId);
    if (task) {
      task.status = 'Done';
      this.taskService.updateTask(task);
      this.dueTodayTasks = this.dashboardService.getTasksDueToday();
    }
  }
}
