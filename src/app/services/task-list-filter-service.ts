import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskListFilterService {
  selectedFilter: string = 'creationDate';

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }
}
