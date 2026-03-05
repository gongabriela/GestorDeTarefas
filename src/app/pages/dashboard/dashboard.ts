import { Component } from '@angular/core';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { KpiData } from '../../models/kpi-data.model';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
// APAGAR O array com os dados que amanhã virão do LocalStorage/Service
  kpiList: KpiData[] = [
    { title: 'Total Tasks', value: 18, color: 'var(--cor-banana)' },
    { title: 'Completed', value: 12, color: 'var(--cor-verde)' },
    { title: 'In Progress', value: 2, color: 'var(--cor-azul-ceu)' },
    { title: 'Overdue', value: 4, color: 'var(--cor-rosa)' }
  ];
}
