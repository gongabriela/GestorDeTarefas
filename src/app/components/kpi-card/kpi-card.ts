import { Component, Input } from '@angular/core';
import { KpiData } from '../../models/kpi-data.model';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCard {
  @Input() kpi!: KpiData;
}
