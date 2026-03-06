export interface KpiData {
  title: string;
  value: number;
  color: string;
}

export interface IDashboardKPIs {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}