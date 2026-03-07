import { Component, OnInit } from '@angular/core';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { KpiData, IDashboardKPIs } from '../../models/kpi-data.model';
import { DashboardTaskItem } from '../../components/dashboard-task-item/dashboard-task-item';
import { DashboardService } from '../../services/dashboard-service';
import { ITask } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task-service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCard, DashboardTaskItem],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  totals!: IDashboardKPIs;
  dueTodayTasks: ITask[] = [];
  kpiList: KpiData[] = []; // Esta é a lista que o teu HTML já percorre

  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  handleCompleteTask(taskId: number) : void {
    
    const task: ITask | undefined = this.taskService.getTaskById(taskId);
    if (task) {
      task.status = 'Done';
      this.taskService.updateTask(task);
      this.refreshData();
    }
  }
  refreshData() {
    this.totals = this.dashboardService.getKPIs();
    this.dueTodayTasks = this.dashboardService.getTasksDueToday();
    
    // Transformamos os dados brutos na estrutura que o teu kpi-card entende
    this.kpiList = [
      { title: 'Total Tasks', value: this.totals.total, color: '#ffcc00' },
      { title: 'Completed', value: this.totals.completed, color: '#00ff88' },
      { title: 'In Progress', value: this.totals.inProgress, color: '#00e5ff' },
      { title: 'Overdue', value: this.totals.overdue, color: '#ff4d4f' }
    ];
  }
}