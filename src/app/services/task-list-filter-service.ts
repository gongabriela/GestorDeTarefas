import { Injectable } from '@angular/core';

export type SortOption = 'creationDate' | 'dueDateAsc';

@Injectable({
  providedIn: 'root',
})
export class TaskListFilterService {
  selectedFilter: SortOption = 'creationDate';

  setFilter(filter: SortOption): void {
    this.selectedFilter = filter;
  }
}
